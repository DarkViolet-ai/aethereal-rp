import { Form } from "@remix-run/react";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/textComponents";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import LoadingText from "~/components/specialty/loading";
import {
  borderShadow,
  cardWidths,
  colMaxWidths,
  cursiveText,
  headingSizes,
} from "~/css/styles";
import type { StoryData } from "~/lib/db/story.server";

export default function InteractionPage({
  story,
  isActiveCharacter,
  characterName,
}: {
  story: StoryData;
  isActiveCharacter: boolean;
  characterName: string;
}) {
  const promptText = (isActiveCharacter && story?.prompt) || "";
  const paragraphs = promptText.split("\n");

  // const paragraphs = [
  //   " Vox spree tuff flea raw bubbles sag bluff pox tingle huff blabber straw. Jabber squish huff flea clumsy ruff. Backpack jamboree poodle gnaw crackerjack nix jabber chocolate. ",
  //   "Pop tag drag straw mingle whack gnaw fairy flipflop. Cox fox yak pop flapjack glisten quack plainy bubbles. Top fluster brag yak butterfly. ",
  //   "Lox jellybean cat bungle piddle. Wag bubble box mop yabber rainbow chocolate flipflop law piddle kitten waddle backpack. Paw gruff tack crackerjack whack clumsy top drop gag noodle sugar mumble. ",
  // ];

  return (
    <Flex
      className={`w-full h-full justify-center items-center ${colMaxWidths}`}
    >
      <VStack className="w-full h-full p-2 pb-4" gap="gap-5">
        <VStack className="w-full h-40% flex-shrink-0">
          <Box className={`w-full h-full relative ${borderShadow}`}>
            {!story.content && !story.prompt && (
              <Box className="absolute bottom-0 right-2 w-150px">
                <LoadingText dotCount={4} />
              </Box>
            )}

            <DarkViolet
              name="10"
              w="w-20%"
              pos="absolute"
              b="bottom-0"
              l="left-[5px]"
            />
            <DarkViolet
              name="star1"
              w="w-16% lg:w-13% xl:w-12% xxl:w-8%"
              pos="absolute"
              t="top-[44px] xl:top-[20px] xxl:top-[13px]"
              l="left-[23px]"
            />

            <Flex className="w-full h-full bg-dv-700 bg-darkVioletGrad shadow-shadow3D overflow-y-auto justify-end">
              <Flex className="w-76% bg-dv-950 shadow-shadow3D h-fit min-h-full p-2 pr-0 rounded-l-none">
                <VStack className="w-full gap-[10px] py-2">
                  {paragraphs.map((paragraph, index) => (
                    <Flex key={index} className={`${cardWidths}`}>
                      <Text className="text-shadow-dvTextShadow">
                        {paragraph.trim()}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Flex>
            </Flex>
          </Box>
        </VStack>
        <Form
          method="post"
          style={{
            width: "100%",
            height: "60%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input type="hidden" name="storyId" value={story.id} />
          <VStack className="w-full h-full" gap="gap-[15px]">
            <Flex
              className={`${cursiveText} ${headingSizes} text-shadow-textFog flex-shrink-0`}
            >
              <Text>You are {characterName}</Text>
            </Flex>
            <Flex className="w-full h-full justify-center ">
              <TextAreaVStack
                autoFocus={true}
                textAreaWidth="w-full"
                textAreaHeight="h-full"
                name="newInput"
              />
            </Flex>
            <Button type="submit" className="w-[200px]">
              Submit
            </Button>
          </VStack>
        </Form>
      </VStack>
    </Flex>
  );
}
