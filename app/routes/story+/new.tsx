import type { DataFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
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
import { cardColors, topNavPadding } from "~/css/styles";
import VStack from "~/components/buildingBlocks/vStack";
import {
  NavLink,
  Outlet,
  useLocation,
  useOutletContext,
} from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import DarkViolet from "~/components/specialty/darkViolet";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const templates = await getAllTemplates();
  return typedjson({ templates });
};

export default function StoryTemplate() {
  // const dummyData = Stories;
  const { templates } = useTypedLoaderData<typeof loader>();
  const context = useOutletContext();
  const location = useLocation();
  const isNew = location.pathname.endsWith("new" || "new/");
  const isEdit = location.pathname.endsWith("edit" || "edit/");
  const isView = location.pathname.endsWith("view" || "view/");
  return (
    <>
      {/* // MOBILE VIEW NEW & EDIT ----------------------------------------------------------- // */}
      <VStack
        className={`w-full h-full flex lg:hidden overflow-x-hidden overflow-y-auto pt-[10px]`}
      >
        {isNew && (
          <>
            <ColumnsPageColumn
              heading="Start a Story"
              transitionType="slideInLeft"
            >
              <VStack
                className="w-full gap-5 fullHD:gap-7 quadHD:gap-9 ultraHD:gap-12 pt-[10px] pb-[20px]"
                align="center"
              >
                <NavLink
                  to="edit"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
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
          </>
        )}

        {isEdit && (
          <div className="w-full h-fit justify-center">
            <ColumnsPageColumn
              transitionType="slideInRight"
              containerClassName="items-center h-full lg:items-start lg:h-auto"
            >
              <Outlet context={context} />
            </ColumnsPageColumn>
          </div>
        )}
        {isView && (
          <div className="w-full h-fit justify-center">
            <ColumnsPageColumn
              transitionType="slideInRight"
              containerClassName="items-center h-full lg:items-start lg:h-auto"
            >
              <Outlet context={context} />
            </ColumnsPageColumn>
          </div>
        )}
      </VStack>
      {/* // DESKTOP VIEW NEW & EDIT ----------------------------------------------------------- // */}
      <Flex className="w-full h-full jusity-center hidden lg:flex">
        <ColumnsPageContainer transitionScreen="lg">
          <ColumnsPageColumn
            heading="Start a Story"
            transitionType="slideInLeft"
          >
            <VStack
              className="w-full gap-5 fullHD:gap-7 quadHD:gap-9 ultraHD:gap-12 pt-[10px] pb-[20px]"
              align="center"
            >
              <NavLink
                to="edit"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
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
          {isNew ? (
            <ColumnsPageColumn
              bg="bg-transparent"
              containerClassName="hidden lg:flex "
              transitionType="slideInRight"
            >
              <Flex className="w-full h-full bg-[url('/images/core/containerBackground2.png')] bg-cover bg-center bg-no-repeat relative">
                <DarkViolet
                  name="10"
                  b="bottom-0"
                  r="right-2"
                  w="w-50% xl:w-40% ultraHD:w-50%"
                />
                <DarkViolet
                  name="speechBubble"
                  w="w-60%"
                  b="lg:bottom-1/2"
                  l="left-2 quadHD:left-6 ultraHD:left-10"
                />
              </Flex>
            </ColumnsPageColumn>
          ) : (
            <ColumnsPageColumn
              transitionType="slideInRight"
              containerClassName="hidden lg:flex "
            >
              <Outlet context={context} />
            </ColumnsPageColumn>
          )}
        </ColumnsPageContainer>
      </Flex>
    </>
  );
}
