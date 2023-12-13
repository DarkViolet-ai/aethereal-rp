import type { DataFunctionArgs } from "@remix-run/node";
import {
  typedjson,
  useTypedActionData,
  useTypedLoaderData,
} from "remix-typedjson";
import {
  ColumnsPageColumn,
  ColumnsPageContainer,
} from "~/components/buildingBlocks/columnsPage";
// import { Stories } from "~/css/styles";
import {
  getAllTemplates,
  // getStoryTemplate,
} from "~/lib/db/storyTemplate.server";
import NewStoryCard from "./components/newStoryCard";
import StoryCard from "../components/storyCard";
import { cardColors } from "~/css/styles";
import VStack from "~/components/buildingBlocks/vStack";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const templates = await getAllTemplates();
  return typedjson({ templates });
};

export default function StoryTemplate() {
  // const dummyData = Stories;
  const { templates } = useTypedLoaderData<typeof loader>();

  return (
    <ColumnsPageContainer transitionScreen="lg">
      <ColumnsPageColumn heading="Start a Story">
        <VStack  className="w-full gap-4">
          <NewStoryCard />
          {templates.map((template, index) => (
            <StoryCard
              key={template.id}
              story={template}
              bgColor={cardColors[index % cardColors.length]}
            />
          ))}
        </VStack>
      </ColumnsPageColumn>
      <ColumnsPageColumn>COLUMN 2</ColumnsPageColumn>
    </ColumnsPageContainer>
  );
}
