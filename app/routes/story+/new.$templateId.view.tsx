import type { DataFunctionArgs } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { createStoryFromTemplate } from "~/lib/db/story.server";
import { getStoryTemplate } from "~/lib/db/storyTemplate.server";
import { submitStoryInitiation } from "~/lib/queue/queues";
import { requireUserId } from "~/lib/utils/session.server";
import ViewPanel from "./components/viewPanel";
import type { StoryTemplate } from "@prisma/client";
// import useSizedImage from "../hooks/useSizedImage";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  return typedjson({
    storyTemplate: await getStoryTemplate({ id: params.templateId as string }),
  });
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const authorId = await requireUserId(request);
  const storyTemplateId = params.templateId as string;

  const story = await createStoryFromTemplate({
    templateId: storyTemplateId,
    authorId,
  });
  await submitStoryInitiation({ storyId: story.id });
  return redirect(`/story/char-select/${story.id}`);
};

export default function TemplateDisplay() {
  const { storyTemplate } = useTypedLoaderData<typeof loader>();
  // const imageUrl = useSizedImage(storyTemplate?.id, "medium");
  const location = useLocation();
  const pathname = location.pathname;
  const isView = pathname.endsWith("view" || "view/");
  console.log("isView: ", isView);

  return <ViewPanel storyTemplate={storyTemplate as StoryTemplate} />;
}
