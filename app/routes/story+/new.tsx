import { DataFunctionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import {
  getAllTemplates,
  getStoryTemplate,
} from "~/lib/db/storyTemplate.server";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const templates = await getAllTemplates();
  return typedjson({ templates });
};
