import { Queue } from "bullmq";
import { getWorker } from "./workers";
import { qRedisGetConnection } from "../utils/redis.server";

const REDIS_URL = process.env.REDIS_URL as string;

export enum QueueName {
  STATUS = "status",
  GENERATE_STORY = "generate-story",
  GENERATE_CHARACTER = "generate-character",
  ERROR = "error",
}

declare global {
  var __queues: {
    [key in QueueName]: Queue;
  };
}

export const getQueue = (name: QueueName): Queue => {
  if (!global.__queues) {
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
  storyId,
  input,
}: {
  storyId: string;
  input: string;
}) => {
  const queue = getQueue(QueueName.GENERATE_CHARACTER);
  await queue.add(QueueName.GENERATE_CHARACTER, {
    storyId,
    input,
  });
};