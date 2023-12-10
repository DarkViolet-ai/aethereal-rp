import { emitter } from "../utils/emitter.server";

const SESSION_SECRET = process.env.SESSION_SECRET as string;

export const dvEventNames = {
  status: (storyId: string) => `status-update:${storyId}${SESSION_SECRET}`,
};

export const dvEvent = {
  status: (userId: string) => emitter.emit(dvEventNames.status(userId)),
};
