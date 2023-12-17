import { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { userLeaveStory } from "~/lib/db/user.server";
import { requireUserId } from "~/lib/utils/session.server";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const userId = await requireUserId(request);
  const { storyId, characterName } = params as {
    storyId: string;
    characterName: string;
  };
  await userLeaveStory({ storyId, characterName, userId });
  return redirect(`/`);
};
