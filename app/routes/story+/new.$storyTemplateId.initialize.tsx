import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { Prisma } from "@prisma/client";
import { getLatestVersionofStory } from "~/lib/db/story.server";
import { createStoryFromTemplate } from "~/lib/db/story.server";
import { getStoryTemplate } from "~/lib/db/storyTemplate.server";
import { submitStoryInitiation } from "~/lib/queue/queues";
import { requireUserId } from "~/lib/utils/session.server";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const authorId = await requireUserId(request);
  const storyTemplateId = params.storyTemplateId as string;

  const story = await createStoryFromTemplate({
    templateId: storyTemplateId,
    authorId,
  });
  await submitStoryInitiation({ storyId: story.id });
  return redirect(`/story/char-select/${story.id}`);
};
