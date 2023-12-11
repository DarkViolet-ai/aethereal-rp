import type { Story } from "@prisma/client";
import { Form, useParams } from "@remix-run/react";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import LoadingText from "~/components/specialty/loading";
import { borderShadow, cursiveText } from "~/css/styles";
import { dummyText } from "~/lib/utils/randomText";

export default function InteractionPage({ story }: { story: Story }) {
  const promptText = story.prompt ? story.prompt : dummyText;
  const paragraphs = promptText.split("\n");
  const characterName = useParams().characterName || "Jehosephat";

  return (
    <Flex className="w-full h-full justify-center items-center">
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
              <VStack className="w-76% bg-dv-950 shadow-shadow3D h-fit min-h-full p-2 rounded-l-none">
                {paragraphs.map((paragraph, index) => (
                  <Text
                    key={index}
                    className="text-[16px] leading-[23px] text-shadow-dvTextShadow"
                  >
                    {paragraph.trim()}
                  </Text>
                ))}
              </VStack>
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
              className={`${cursiveText}  text-[33px] text-shadow-textFog flex-shrink-0`}
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
