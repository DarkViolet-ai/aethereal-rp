import { Worker, Job } from "bullmq";

import {
  QueueName,
  submitCharacterGeneration,
  submitError,
  submitLog,
  submitStatus,
  submitStoryGeneration,
  submitUserPrompt,
} from "~/lib/queue/queues";
import { dvEvent } from "~/lib/events/dvEvents";
import { qRedisGetConnection } from "../utils/redis.server";
import { redis } from "../utils/redis.server";
import {
  StoryData,
  getNextCharacterInStory,
  getStory,
  setLastInputInStory,
  updateStory,
  updateStoryStatus,
} from "../db/story.server";
import { narratorInstructions } from "../ai/narratorInstructions";
import {
  openaiCharacterGenerator,
  openaiStoryGenerator,
} from "~/lib/ai/openaiGenerator.server";
import { continueStory } from "../ai/narratorGen.server";
import { StoryCharacter } from "../db/character.server";
import { generateCharacterOutput } from "../ai/characterGen.server";
import { LogType, Story, StoryStatus } from "@prisma/client";
import { createLogEntry } from "../db/log.server";
import {
  createAICharacterStep,
  createNarratorStep,
  createUserCharacterStep,
} from "../db/steps.server";
import { clearStoryTimeouts, setStoryTimeouts } from "./timeouts";
import { characterInstructions } from "~/lib/ai/characterInstructions";
import { getStatusMessage } from "./statusMessages";

export type WorkerDispatch = {
  [key in QueueName]: (job: Job) => Promise<void>;
};

const workerDispatch: WorkerDispatch = {
  [QueueName.ERROR]: async (job: Job) => {
    const { message, stack } = job.data as { message: string; stack?: string };
    await submitLog({ type: "ERROR", message, stack });
    console.log("error", message, stack);
  },

  //**************************************************************************/
  [QueueName.STATUS]: async (job: Job) => {
    const { storyId, status } = job.data as {
      storyId: string;
      status: StoryStatus;
    };
    await submitLog({ type: "INFO", message: `status: ${storyId} ${status}` });
    const story = await updateStoryStatus({ id: storyId, status });
    console.log("sending status", storyId, getStatusMessage({ story }));
    dvEvent.status(storyId, getStatusMessage({ story }));
  },

  //**************************************************************************/
  [QueueName.INITIATE_STORY]: async (job: Job) => {
    const { storyId } = job.data as { storyId: string };
    const story = await getStory({ id: storyId });
    if (await redis.get(`story-init:${storyId}`)) {
      return;
    }
    await redis.setex(`story-init:${storyId}`, 60, "1");
    if (!story) {
      console.log("story not found", storyId);
      await submitError({ message: `story not found: ${storyId}` });
      await submitStatus({ storyId, status: StoryStatus.ERROR });
      return;
    }
    await submitStatus({ storyId, status: StoryStatus.NARRATOR });
    const { story: updatedStory, newContent } = await continueStory({
      story,
      narratorInstructions,
      generator: openaiStoryGenerator,
    });

    newContent.length > 0 &&
      (await createNarratorStep({ storyId, content: newContent }));
    await submitStatus({ storyId: story.id, status: StoryStatus.USER });
    await submitUserPrompt({ story: updatedStory });
  },
  //**************************************************************************/
  [QueueName.PROMPT_USER]: async (job: Job) => {
    console.log("handling user prompt");
    const { story: _story } = job.data as { story: StoryData };
    const story = await getStory({ id: _story.id });

    if (!story?.isActive) {
      submitLog({
        type: "INFO",
        message: "Story is not active.  Will wait for user to join.",
      });
      return;
    }
    if (!story?.nextCharacter) {
      await submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      await submitStatus({ storyId: story.id, status: StoryStatus.ERROR });
      return;
    }
    if (!story?.prompt) {
      await submitError({ message: `prompt not found: ${story.prompt}` });
      await submitStatus({ storyId: story.id, status: StoryStatus.ERROR });
      return;
    }
    const { characterName, characterUsername, characterUserId } =
      getNextCharacterInStory({ story });

    if (!characterName) {
      await submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      await submitStatus({ storyId: story.id, status: StoryStatus.ERROR });
      return;
    }

    if (characterUsername === "ai") {
      console.log("submitting ai status");
      await submitStatus({
        storyId: story.id,
        status: StoryStatus.AICHARACTER,
      });
      await submitCharacterGeneration({
        story,
      });
    } else {
      console.log("submitting user status");
      await submitStatus({
        storyId: story.id,
        status: StoryStatus.USER,
      });
      const { characters } = story;
      const rolePlayerCount = new Set(
        characters
          .filter((c: StoryCharacter) => c.rolePlayer !== null)
          .map((c: StoryCharacter) => c.rolePlayer?.id)
      ).size;
      console.log("rolePlayerCount", rolePlayerCount);
      // characterUserId &&
      //   rolePlayerCount > 1 &&
      //   (await setStoryTimeouts({
      //     story,
      //     characterName,
      //     userId: characterUserId,
      //   }));
    }
  },

  //**************************************************************************/
  [QueueName.GENERATE_STORY]: async (job: Job) => {
    const { storyId, input } = job.data as { storyId: string; input: string };
    //await clearStoryTimeouts(storyId);
    await submitLog({ type: "INFO", message: "generate story" });
    console.log("generate story", storyId, input);
    if (await redis.get(`story-input:${storyId}:${input}`)) {
      return;
    }
    await redis.setex(`story-input:${storyId}:${input}`, 60, "1");
    const story = await setLastInputInStory({
      storyId,
      lastInput: input,
    });
    if (!story) {
      console.log("story not found", storyId);
      await submitError({ message: `story not found: ${storyId}` });
      await submitStatus({ storyId, status: StoryStatus.ERROR });
      return;
    }
    if (!story.nextCharacter) {
      await submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      await submitStatus({ storyId, status: StoryStatus.ERROR });
      return;
    }
    if (!story.prompt) {
      await submitError({ message: `prompt not found: ${story.prompt}` });
      await submitStatus({ storyId, status: StoryStatus.ERROR });
      return;
    }
    const { characterUsername: stepUsername, characterUserId } =
      getNextCharacterInStory({ story });

    if (stepUsername === "ai") {
      await createAICharacterStep({
        storyId,
        content: input,
        characterName: story.nextCharacter,
        characterPrompt: story.prompt,
      });
    } else {
      if (!characterUserId) {
        await submitError({
          message: `characterUserId not found: ${characterUserId}`,
        });
        await submitStatus({ storyId, status: StoryStatus.ERROR });
        return;
      }
      await createUserCharacterStep({
        storyId,
        content: input,
        characterName: story.nextCharacter,
        characterPrompt: story.prompt,
        userId: characterUserId,
      });
    }

    console.log("submitting narrator status");
    await submitStatus({ storyId, status: StoryStatus.NARRATOR });
    console.log("submitting narrator generation");
    const { newContent } = await continueStory({
      story,
      narratorInstructions,
      generator: openaiStoryGenerator,
      newInput: input,
    });
    newContent.length > 0 &&
      (await createNarratorStep({ storyId, content: newContent }));
    console.log("submitting user prompt");
    await submitUserPrompt({ story });
  },

  //**************************************************************************/
  [QueueName.GENERATE_CHARACTER]: async (job: Job) => {
    const { story: _story } = job.data as {
      story: StoryData;
    };
    const story = await getStory({ id: _story.id });

    // if there are no roleplayers left, set the story to inactive.
    console.log("generate character ", story?.nextCharacter);
    if (!story || !story.characters.some((c) => c.rolePlayer !== null)) {
      story &&
        (await submitStatus({ storyId: story.id, status: StoryStatus.PAUSED }));
      story && (await updateStory({ id: story.id, isActive: false }));
      return;
    }
    console.log("submitting character generation");
    // duplicate generations can only be re-sent every 60 seconds
    if (
      (await redis.get(`story-prompt:${story.id}:${story.prompt}`)) === null
    ) {
      await redis.setex(`story-prompt:${story.id}:${story.prompt}`, 60, "1");
      const result = await generateCharacterOutput({
        story,
        characterInstructions,
        generator: openaiCharacterGenerator,
      });
      if (!result) {
        await submitError({
          message: `character generation failed: ${story.nextCharacter}`,
        });
        await submitStatus({ storyId: story.id, status: StoryStatus.ERROR });
        return;
      }
      await submitStoryGeneration({
        storyId: story.id,
        input: result,
      });
    }
  },

  //**************************************************************************/
  [QueueName.LOG]: async (job: Job) => {
    const { type, message, stack } = job.data as {
      type: LogType;
      message: string;
      stack?: string;
    };
    console.log("log", type, message, stack);
    await createLogEntry({ type, message, stack });
  },
};

export const getWorker = (name: QueueName) => {
  const { connection } = qRedisGetConnection();
  const worker = new Worker(name, workerDispatch[name], {
    connection,
    concurrency: 50,
  });
  worker.on("error", (error) => {
    console.log("worker error", error);
  });
  return worker;
};
