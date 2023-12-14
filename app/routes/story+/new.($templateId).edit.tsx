import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import EditTemplate from "./components/editTemplate";
import type { DataFunctionArgs } from "@remix-run/node";
import {
  createStoryTemplate,
  getStoryTemplate,
  updateStoryTemplate,
} from "~/lib/db/storyTemplate.server";
import { z } from "zod";

const storyTemplateSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  summary: z.string(),
});

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const id = params.templateId;
  if (!id) {
    return typedjson({
      storyTemplate: { title: "", summary: "", imageUrl: "" },
    });
  }
  return typedjson({
    storyTemplate: await getStoryTemplate({ id: params.templateId as string }),
  });
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  let id = params.templateId;
  const formData = await request.formData();
  try {
    const template = storyTemplateSchema.parse(
      Object.fromEntries(formData.entries())
    );
    if (!id) {
      const newTemplate = await createStoryTemplate(template);
      id = newTemplate.id;
    } else {
      await updateStoryTemplate({ id, data: template });
    }
  } catch (e) {
    return typedjson({ error: e });
  }

  if (searchParams.get("begin") === "true") {
    return redirect(`/story/new/${id}/initialize`);
  }

  return redirect(`/story/new/${id}/view`);
};

export default function TemplateEdit() {
  const { storyTemplate } = useTypedLoaderData<typeof loader>();
  return (
    <EditTemplate
      title={storyTemplate?.title || ""}
      summary={storyTemplate?.summary || ""}
      imagePath={storyTemplate?.imageUrl || ""}
    />
  );
}
