import { typedjson, useTypedLoaderData } from "remix-typedjson";
import EditTemplate from "./components/editTemplate";
import type { DataFunctionArgs } from "@remix-run/node";
import { getStoryTemplate } from "~/lib/db/storyTemplate.server";

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
