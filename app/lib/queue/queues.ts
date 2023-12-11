import { Queue } from "bullmq";
import { getWorker } from "./workers";
import { qRedisGetConnection } from "../utils/redis.server";
import { Character, LogType } from "@prisma/client";
import { StoryCharacter } from "../db/character.server";
import { StoryData } from "../db/story.server";
import { QueueEvents } from "bullmq";

const REDIS_URL = process.env.REDIS_URL as string;

export enum QueueName {
  STATUS = "status",
  INITIATE_STORY = "create-story",
  PROMPT_USER = "prompt-user",
  GENERATE_STORY = "generate-story",
  GENERATE_CHARACTER = "generate-character",
  ERROR = "error",
  LOG = "log",
}

declare global {
  var __queues: {
    [key in QueueName]: Queue;
  };
}

export const getQueue = (name: QueueName): Queue => {
  if (!global.__queues) {
    const { connection: qeConnection } = qRedisGetConnection();
    const queueEvents = new QueueEvents(QueueName.GENERATE_STORY, {
      connection: qeConnection,
    });

    queueEvents.on(
      "completed",
      ({ jobId, returnvalue }: { jobId: string; returnvalue: any }) => {
        console.log(`Job completed`, jobId);
      }
    );

    queueEvents.on(
      "failed",
      ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
        console.log(`Job failed`, jobId, failedReason);
      }
    );

    // iterate over all values of QueueName and create a queue for each
    global.__queues = Object.values(QueueName).reduce(
      (queues: { [key in QueueName]: Queue }, queueName: QueueName) => {
        const { connection } = qRedisGetConnection();
        queues[queueName] = new Queue(queueName, {
          connection,
        });
        const worker = getWorker(queueName); // start a worker for each queue
        return queues;
      },
      {} as { [key in QueueName]: Queue }
    );
  }
  return global.__queues[name];
};

export const submitError = async ({
  message,
  stack,
}: {
  message: string;
  stack?: string;
}) => {
  const queue = getQueue(QueueName.ERROR);
  await queue.add(QueueName.ERROR, {
    message,
    stack,
  });
};

export const submitStatus = async ({
  storyId,
  statusMessage,
}: {
  storyId: string;
  statusMessage: string;
}) => {
  const queue = getQueue(QueueName.STATUS);
  await queue.add(QueueName.STATUS, {
    storyId,
    statusMessage,
  });
};

export const submitStoryInitiation = async ({
  storyId,
}: {
  storyId: string;
}) => {
  const queue = getQueue(QueueName.INITIATE_STORY);
  await queue.add(QueueName.INITIATE_STORY, {
    storyId,
  });
};

export const submitUserPrompt = async ({ story }: { story: StoryData }) => {
  const queue = getQueue(QueueName.PROMPT_USER);
  await queue.add(QueueName.PROMPT_USER, {
    story,
  });
};

export const submitStoryGeneration = async ({
  storyId,
  input,
}: {
  storyId: string;
  input: string;
}) => {
  const queue = getQueue(QueueName.GENERATE_STORY);
  await queue.add(QueueName.GENERATE_STORY, {
    storyId,
    input,
  });
};

export const submitCharacterGeneration = async ({
  story,
}: {
  story: StoryData;
}) => {
  const queue = getQueue(QueueName.GENERATE_CHARACTER);
  await queue.add(QueueName.GENERATE_CHARACTER, {
    story,
  });
};

export const submitLog = async ({
  type,
  message,
  stack,
}: {
  type: LogType;
  message: string;
  stack?: string;
}) => {
  const queue = getQueue(QueueName.LOG);
  await queue.add(QueueName.LOG, {
    message,
    stack,
  });
};
