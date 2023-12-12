import {
  Stories,
  TempCharacterList,
  borderShadow,
  cursiveText,
} from "~/css/styles";
import Flex from "~/components/buildingBlocks/flex";
import Transition from "~/components/buildingBlocks/transition";
import { Outlet, useParams } from "@remix-run/react";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";
import Characters from "./components/characters";
import Box from "~/components/buildingBlocks/box";
import LabelValue from "~/components/buildingBlocks/labelValue";
import HStack from "~/components/buildingBlocks/hStack";

export default function StoryId() {
  const params = useParams();
  const storyId = Number(params.storyId);
  const tempStory = Stories[storyId];
  const isStory = params.characterId !== undefined;
  const characters = TempCharacterList.slice(0, 5);
  const paragraphs = tempStory.content.split("\n");
  return (
    <>
      {isStory ? (
        <Outlet />
      ) : (
        <Transition type="zoom" className="w-full h-full">
          <VStack className="w-full h-full gap-[15px] lg:gap-[35px] overflow-y-hidden">
            <VStack className="w-full h-full overflow-y-auto lg:overflow-y-hidden py-[20px]">
              <VStack className="w-full flex-shrink-0">
                <Flex className="w-full justify-center">
                  <Text
                    className={`${cursiveText} text-[33px] md:text-[40px] lg:text-[28px] xl:text-[32px] xxl:text-[40px] text-shadow-textFog`}
                  >
                    {tempStory.title}
                  </Text>
                </Flex>{" "}
                <Flex className="w-full justify-center px-3">
                  <Text className={`leading-[26px] text-shadow-dvTextShadow`}>
                    {tempStory.summary}
                  </Text>
                </Flex>
              </VStack>
              <Flex className="w-full h-fit lg:h-90% flex-col lg:flex-row gap-[10px] lg:gap-[20px] ">
                <Flex className="w-full h-full lg:w-1/2 px-4 justify-center">
                  <Box
                    className={`h-full bg-calmGrayBack bg-darkCyanGrad max-w-[700px] ${borderShadow}`}
                  >
                    <Characters characters={characters} />
                  </Box>
                </Flex>
                <Flex className="w-full h-full lg:w-1/2  px-4 justify-center">
                  <VStack
                    className={`w-full bg-calmGrayBack bg-darkCyanGrad ${borderShadow} max-w-[700px]`}
                  >
                    <HStack className="w-full h-[70px] bg-dv-975 bg-darkCyanGrad rounded-b-none p-3 items-center border-b-2 border-dv-450">
                      <Text
                        className={`${cursiveText} text-[40px] text-shadow-textFog`}
                      >
                        The Story
                      </Text>
                    </HStack>

                    <VStack className="w-full h-fit lg:h-full lg:overflow-y-auto px-[40px] text-dv-100 text-shadow-dvTextShadow leading-[20px] py-3">
                      {paragraphs.map((paragraph, index) => (
                        <Text key={index} className="text-[18px]">
                          {paragraph.trim()}
                        </Text>
                      ))}
                    </VStack>
                  </VStack>
                </Flex>
              </Flex>
            </VStack>
          </VStack>
        </Transition>
      )}
    </>
  );
}
