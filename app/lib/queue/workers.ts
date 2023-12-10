import { Worker, Job } from "bullmq";

import {
  QueueName,
  submitCharacterGeneration,
  submitError,
  submitStatus,
} from "~/lib/queue/queues";
import { dvEvent } from "~/lib/events/dvEvents";
import { qRedisGetConnection } from "../utils/redis.server";
import { redis } from "../utils/redis.server";
import { getStory, updateStoryStatus } from "../db/story.server";
import { narratorInstructions } from "../ai/narratorInstructions";
import {
  openaiCharacterGenerator,
  openaiStoryGenerator,
} from "~/lib/ai/openaiGenerator.server";
import { continueStory } from "../ai/narrator.server";
import { StoryCharacter } from "../db/character.server";

const REDIS_URL = process.env.REDIS_URL as string;

export type WorkerDispatch = {
  [key in QueueName]: (job: Job) => Promise<void>;
};

const workerDispatch: WorkerDispatch = {
  [QueueName.ERROR]: async (job: Job) => {
    const { message, stack } = job.data as { message: string; stack?: string };
    console.log("error", message, stack);
  },

  [QueueName.STATUS]: async (job: Job) => {
    const { storyId, statusMessage } = job.data as {
      storyId: string;
      statusMessage: string;
    };
    await updateStoryStatus({ id: storyId, status: statusMessage });
    dvEvent.status(storyId);
  },

  [QueueName.GENERATE_STORY]: async (job: Job) => {
    const { storyId, input } = job.data as { storyId: string; input: string };

    const story = await getStory({ id: storyId });
    if (!story) {
      console.log("story not found", storyId);
      submitError({ message: `story not found: ${storyId}` });
      submitStatus({ storyId, statusMessage: "error" });
      return;
    }
    submitStatus({ storyId, statusMessage: "narrator" });
    await continueStory({
      story,
      narratorInstructions,
      generator: openaiStoryGenerator,
      newInput: input,
    });
    const nextCharacterRecord = story.characters.find(
      (character) => character.name === story.nextCharacter
    );
    if (!nextCharacterRecord) {
      submitError({
        message: `next character not found: ${story.nextCharacter}`,
      });
      submitStatus({ storyId, statusMessage: "error" });
      return;
    }
    const nextUser = nextCharacterRecord.rolePlayer?.name || "ai";
    submitStatus({
      storyId,
      statusMessage: `${nextUser}:${story.nextCharacter}`,
    });
    if (nextUser === "ai") {
      submitCharacterGeneration({
        storyId,
        character: nextCharacterRecord,
        input,
      });
    }
  },
  [QueueName.GENERATE_CHARACTER]: async (job: Job) => {
    const { storyId, character, input } = job.data as {
      storyId: string;
      character: StoryCharacter;
      input: string;
    };
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
