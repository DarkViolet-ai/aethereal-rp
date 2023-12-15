import type { Redis as RedisType } from "ioredis";
import Redis from "ioredis";

let redis: RedisType;

declare global {
  var __redis: RedisType | undefined;
}
const REDIS_URL = process.env.REDIS_URL as string;

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the Redis with every change either.
if (process.env.NODE_ENV === "production") {
  redis = new Redis(REDIS_URL, { family: 6 });
} else {
  if (!global.__redis) {
    global.__redis = new Redis(REDIS_URL);
  }
  redis = global.__redis;
}

export const qRedisGetConnection = () => {
  return {
    connection: new Redis(REDIS_URL, { maxRetriesPerRequest: null, family: 6 }),
  };
};

export { redis };
