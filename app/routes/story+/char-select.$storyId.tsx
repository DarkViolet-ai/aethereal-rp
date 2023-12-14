import { cardWidths } from "~/css/styles";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";
import Characters from "./components/characters";
import type { DataFunctionArgs } from "@remix-run/node";
import { getStory } from "~/lib/db/story.server";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import type { StoryCharacter } from "~/lib/db/character.server";
import Box from "~/components/buildingBlocks/box";
import useStatusStream from "~/lib/hooks/useStatusStream";
import { useEffect } from "react";
import { useRevalidator } from "@remix-run/react";
import {
  ColumnsPageColumn,
  ColumnsPageContainer,
} from "~/components/buildingBlocks/columnsPage";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const storyId = params.storyId as string;
  const story = await getStory({ id: storyId });
  return typedjson({ story });
};

export default function StoryId() {
  const { story } = useTypedLoaderData<typeof loader>();
  const data = useStatusStream(story?.id);
  const { revalidate } = useRevalidator();
  useEffect(() => {
    if (data) {
      console.log(data);
      revalidate();
    }
  }, [data, revalidate]);

  const characters = story?.characters || ([] as StoryCharacter[]);
  const paragraphs = story?.content.split("\n") || ([] as string[]);

  if (!story) {
    return redirect("/");
  }

  return (
    <ColumnsPageContainer
      transitionScreen="lg"
      title={story?.title || ""}
      subtitle={story?.summary || ""}
    >
      <ColumnsPageColumn heading="The Characters" transitionType="slideInLeft">
        <Characters characters={characters} />
      </ColumnsPageColumn>
      <ColumnsPageColumn heading="The Story" transitionType="slideInRight">
        <VStack className="w-full h-fit lg:h-full lg:overflow-y-auto text-dv-100 text-shadow-dvTextShadow py-3">
          {paragraphs.map((paragraph, index) => (
            <Box key={index} className={`${cardWidths} px-2`}>
              <Text>{paragraph.trim()}</Text>
            </Box>
          ))}
        </VStack>
      </ColumnsPageColumn>
    </ColumnsPageContainer>
  );
}
