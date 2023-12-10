import { StoryData } from "../db/story.server";
import { userLeaveStory } from "../db/user.server";
import { redis } from "../utils/redis.server";
import { submitCharacterGeneration, submitStatus } from "./queues";

const STORY_WARNING_1 = 30 * 1000; // 30 seconds
const STORY_WARNING_2 = 45 * 1000; // 45 seconds
const STORY_TIMEOUT = 60 * 1000; // 60

const timeoutKeys = {
  "story-warning-1": (storyId: string) => `story-warning-1:${storyId}`,
  "story-warning-2": (storyId: string) => `story-warning-2:${storyId}`,
  "story-timeout": (storyId: string) => `story-timeout:${storyId}`,
};

export const setStoryTimeouts = async ({
  story,
  characterName,
  userId,
}: {
  story: StoryData;
  characterName: string;
  userId: string;
}) => {
  const warning1 = setTimeout(async () => {
    await submitStatus({
      storyId: story.id,
      statusMessage: `Character ${characterName} is taking a while to respond.`,
    });
  }, STORY_WARNING_1);
  const warning2 = setTimeout(async () => {
    await submitStatus({
      storyId: story.id,
      statusMessage: `Character ${characterName} will soon miss their turn.`,
    });
  }, STORY_WARNING_2);
  const timeout = setTimeout(async () => {
    await submitStatus({
      storyId: story.id,
      statusMessage: `Character ${characterName} has missed their turn.`,
    });
    await userLeaveStory({ storyId: story.id, characterName, userId });
    await submitCharacterGeneration({ story });
  }, STORY_TIMEOUT);

  await redis.set(timeoutKeys["story-warning-1"](story.id), String(warning1));
  await redis.set(timeoutKeys["story-timeout"](story.id), String(timeout));
  await redis.set(timeoutKeys["story-warning-2"](story.id), String(warning2));
};

export const clearStoryTimeouts = async (storyId: string) => {
  const warning1 = await redis.get(timeoutKeys["story-warning-1"](storyId));
  const warning2 = await redis.get(timeoutKeys["story-warning-2"](storyId));
  const timeout = await redis.get(timeoutKeys["story-timeout"](storyId));
  if (warning1) {
    clearTimeout(Number(warning1));
  }
  if (warning2) {
    clearTimeout(Number(warning2));
  }
  if (timeout) {
    clearTimeout(Number(timeout));
  }
};
