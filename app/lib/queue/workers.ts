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
import { generateCharaterOutput } from "../ai/characterGen.server";
import { LogType } from "@prisma/client";
import { createLogEntry } from "../db/log.server";
import {
  createAICharacterStep,
  createNarratorStep,
  createUserCharacterStep,
} from "../db/steps.server";
import { clearStoryTimeouts, setStoryTimeouts } from "./timeouts";

const REDIS_URL = process.env.REDIS_URL as string;

export type WorkerDispatch = {
  [key in QueueName]: (job: Job) => Promise<void>;
};

const workerDispatch: WorkerDispatch = {
  [QueueName.ERROR]: async (job: Job) => {
    const { message, stack } = job.data as { message: string; stack?: string };
    submitLog({ type: "ERROR", message, stack });
    console.log("error", message, stack);
  },

  //**************************************************************************/
  [QueueName.STATUS]: async (job: Job) => {
    const { storyId, statusMessage } = job.data as {
      storyId: string;
      statusMessage: string;
    };
    await updateStoryStatus({ id: storyId, status: statusMessage });
    dvEvent.status(storyId, statusMessage);
  },

  //**************************************************************************/
  [QueueName.INITIATE_STORY]: async (job: Job) => {
    const { storyId } = job.data as { storyId: string };
    const story = await getStory({ id: storyId });
    if (!story) {
      console.log("story not found", storyId);
      submitError({ message: `story not found: ${storyId}` });
      submitStatus({ storyId, statusMessage: "error" });
      return;
    }
    const { story: updatedStory, newContent } = await continueStory({
      story,
      narratorInstructions,
      generator: openaiStoryGenerator,
    });

    newContent.length > 0 &&
      (await createNarratorStep({ storyId, content: newContent }));
    await submitUserPrompt({ story: updatedStory });
  },
  //**************************************************************************/
  [QueueName.PROMPT_USER]: async (job: Job) => {
    const { story } = job.data as { story: StoryData };

    if (!story.nextCharacter) {
      submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      submitStatus({ storyId: story.id, statusMessage: "error" });
      return;
    }
    if (!story.prompt) {
      submitError({ message: `prompt not found: ${story.prompt}` });
      submitStatus({ storyId: story.id, statusMessage: "error" });
      return;
    }
    const { characterName, characterUsername, characterUserId } =
      await getNextCharacterInStory({ story });

    if (!characterName) {
      submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      submitStatus({ storyId: story.id, statusMessage: "error" });
      return;
    }

    submitStatus({
      storyId: story.id,
      statusMessage: `${characterUsername}:${story.nextCharacter}`,
    });

    if (characterUsername === "ai") {
      submitCharacterGeneration({
        story,
      });
    } else {
      characterUserId &&
        setStoryTimeouts({ story, characterName, userId: characterUserId });
    }
  },

  //**************************************************************************/
  [QueueName.GENERATE_STORY]: async (job: Job) => {
    const { storyId, input } = job.data as { storyId: string; input: string };
    await clearStoryTimeouts(storyId);
    const story = await getStory({ id: storyId });
    if (!story) {
      console.log("story not found", storyId);
      submitError({ message: `story not found: ${storyId}` });
      submitStatus({ storyId, statusMessage: "error" });
      return;
    }
    if (!story.nextCharacter) {
      submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      submitStatus({ storyId, statusMessage: "error" });
      return;
    }
    if (!story.prompt) {
      submitError({ message: `prompt not found: ${story.prompt}` });
      submitStatus({ storyId, statusMessage: "error" });
      return;
    }
    const { characterUsername: stepUsername, characterUserId } =
      await getNextCharacterInStory({ story });

    if (stepUsername === "ai") {
      createAICharacterStep({
        storyId,
        content: input,
        characterName: story.nextCharacter,
        characterPrompt: story.prompt,
      });
    } else {
      if (!characterUserId) {
        submitError({
          message: `characterUserId not found: ${characterUserId}`,
        });
        submitStatus({ storyId, statusMessage: "error" });
        return;
      }
      createUserCharacterStep({
        storyId,
        content: input,
        characterName: story.nextCharacter,
        characterPrompt: story.prompt,
        userId: characterUserId,
      });
    }
    submitStatus({ storyId, statusMessage: "narrator" });
    const { newContent } = await continueStory({
      story,
      narratorInstructions,
      generator: openaiStoryGenerator,
      newInput: input,
    });
    newContent.length > 0 &&
      (await createNarratorStep({ storyId, content: newContent }));
    await submitUserPrompt({ story });
  },

  //**************************************************************************/
  [QueueName.GENERATE_CHARACTER]: async (job: Job) => {
    const { story } = job.data as {
      story: StoryData;
    };
    // if there are no roleplayers left, set the story to inactive.
    if (!story.characters.some((c) => c.rolePlayer !== null)) {
      submitStatus({ storyId: story.id, statusMessage: "inactive" });
      updateStory({ id: story.id, isActive: false });
      return;
    }
    const result = await generateCharaterOutput({
      story,
      characterInstructions,
      generator: openaiCharacterGenerator,
    });
    if (!result) {
      submitError({
        message: `character generation failed: ${story.nextCharacter}`,
      });
      submitStatus({ storyId: story.id, statusMessage: "error" });
      return;
    }
    await submitStoryGeneration({
      storyId: story.id,
      input: result,
    });
  },

  //**************************************************************************/
  [QueueName.LOG]: async (job: Job) => {
    const { type, message, stack } = job.data as {
      type: LogType;
      message: string;
      stack?: string;
    };
    await createLogEntry({ type, message, stack });
  },
};

export const getWorker = (name: QueueName) => {
  const { connection } = qRedisGetConnection();
  const worker = new Worker(name, workerDispatch[name], {
    connection,
    concurrency: 50,
  });
  return worker;
};
