import {
  borderShadow,
  cardWidths,
  colMaxWidths,
  cursiveText,
  headingSizes,
  textSizes,
  titleSizes,
} from "~/css/styles";
import Flex from "~/components/buildingBlocks/flex";
import Transition from "~/components/buildingBlocks/transition";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";
import Characters from "./components/characters";
import HStack from "~/components/buildingBlocks/hStack";
import type { DataFunctionArgs } from "@remix-run/node";
import { getStory } from "~/lib/db/story.server";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import type { StoryCharacter } from "~/lib/db/character.server";
import Box from "~/components/buildingBlocks/box";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const storyId = params.storyId as string;
  const story = await getStory({ id: storyId });
  return typedjson({ story });
};

export default function StoryId() {
  const { story } = useTypedLoaderData<typeof loader>();
  const characters = story?.characters || ([] as StoryCharacter[]);
  const paragraphs = story?.content.split("\n") || ([] as string[]);

  return (
    <>
      <VStack className="w-full h-full gap-[15px] lg:gap-[35px] overflow-y-hidden">
        <VStack className="w-full h-full overflow-y-auto lg:overflow-y-hidden py-[20px]">
          <VStack className="w-full flex-shrink-0">
            <Flex className="w-full justify-center">
              <Text
                className={`${cursiveText} ${titleSizes} text-shadow-textFog`}
              >
                {story?.title || ""}
              </Text>
            </Flex>{" "}
            <Flex className="w-full justify-center px-3">
              <Text className={`leading-[26px] text-shadow-dvTextShadow`}>
                {story?.summary || ""}
              </Text>
            </Flex>
          </VStack>
          <Flex className="w-full h-fit lg:h-90% flex-col lg:flex-row gap-[40px] lg:gap-[20px] ">
            <Transition
              type="slideInLeft"
              className="w-full h-full lg:w-1/2 px-4 flex justify-center"
            >
              <Flex className={`w-full justify-center`}>
                {" "}
                <Flex
                  className={`h-full bg-calmGrayBack bg-darkCyanGrad justify-center ${borderShadow} ${colMaxWidths} ${textSizes}`}
                >
                  <Characters characters={characters} />
                </Flex>
              </Flex>
            </Transition>
            <Transition
              type="slideInRight"
              delay={0.3}
              duration={0.7}
              className="w-full h-full lg:w-1/2 px-4 flex justify-center"
            >
              {" "}
              <Flex className={`w-full justify-center`}>
                <VStack
                  className={`w-full bg-calmGrayBack bg-darkCyanGrad ${borderShadow} ${colMaxWidths} ${textSizes}`}
                >
                  <HStack className="w-full h-[70px] bg-dv-975 bg-darkCyanGrad rounded-b-none p-3 items-center border-b-2 border-dv-450 ">
                    <Text
                      className={`${cursiveText} ${headingSizes} text-shadow-textFog`}
                    >
                      The Story
                    </Text>
                  </HStack>

                  <VStack className="w-full h-fit lg:h-full lg:overflow-y-auto text-dv-100 text-shadow-dvTextShadow py-3">
                    {paragraphs.map((paragraph, index) => (
                      <Box key={index} className={`${cardWidths} px-2`}>
                        <Text>{paragraph.trim()}</Text>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Flex>
            </Transition>
          </Flex>
        </VStack>
      </VStack>
    </>
  );
}
