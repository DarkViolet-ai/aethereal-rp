import type { DataFunctionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import {
  getAllTemplates,
  getStoryTemplate,
} from "~/lib/db/storyTemplate.server";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const templates = await getAllTemplates();
  return typedjson({ templates });
};

export default function StoryTemplate({
  templates,
}: {
  templates: ReturnType<typeof getAllTemplates>;
}) {
  return <div></div>;
}
