import { StoryStatus } from "@prisma/client";
import { StoryData } from "../db/story.server";

export const statusMessages = {
  [StoryStatus.AICHARACTER]: ({ story }: { story: StoryData }) =>
    `ai:${story.nextCharacter}`,
  [StoryStatus.USER]: ({ story }: { story: StoryData }) =>
    `user:${story.nextCharacter}`,
  [StoryStatus.NARRATOR]: ({ story }: { story: StoryData }) =>
    `narrator:${story.nextCharacter}`,
  [StoryStatus.ERROR]: ({ story }: { story: StoryData }) =>
    "Error.  See log for details",
  [StoryStatus.PAUSED]: ({ story }: { story: StoryData }) => "Pausing story.",
  [StoryStatus.LOCKED]: ({ story }: { story: StoryData }) => "Story is locked.",
};

export const getStatusMessage = ({ story }: { story: StoryData }): string => {
  return (story.status && statusMessages[story.status]({ story })) || "null";
};
