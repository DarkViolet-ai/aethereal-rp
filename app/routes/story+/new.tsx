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
import { NavLink, Outlet } from "@remix-run/react";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const templates = await getAllTemplates();
  return typedjson({ templates });
};

export default function StoryTemplate() {
  // const dummyData = Stories;
  const { templates } = useTypedLoaderData<typeof loader>();

  return (
    <ColumnsPageContainer transitionScreen="lg">
      <ColumnsPageColumn heading="Start a Story" transitionType="slideInLeft">
        <VStack
          className="w-full gap-5 fullHD:gap-7 quadHD:gap-9 ultraHD:gap-12 pb-[20px]"
          align="center"
        >
          <NavLink
            to="edit"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <NewStoryCard newTemplate />
          </NavLink>
          {templates.map((template, index) => (
            <NavLink
              to={`/story/new/${template.id}/view`}
              key={template.id}
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <StoryCard
                hideDate
                key={template.id}
                story={template}
                bgColor={cardColors[index % cardColors.length]}
              />
            </NavLink>
          ))}
        </VStack>
      </ColumnsPageColumn>
      <ColumnsPageColumn transitionType="slideInRight">
        <Outlet />
      </ColumnsPageColumn>
    </ColumnsPageContainer>
  );
}
