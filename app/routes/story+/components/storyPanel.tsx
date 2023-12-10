import type { Story } from "@prisma/client";

import Flex from "~/components/buildingBlocks/flex";
import Image from "~/components/buildingBlocks/image";
import VStack from "~/components/buildingBlocks/vStack";
import { StoryNavButtons } from "./storyNavButtons";
import Box from "~/components/buildingBlocks/box";
import Text from "~/components/buildingBlocks/text";
import { Form } from "@remix-run/react";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import Button from "~/components/buildingBlocks/button";
import { borderShadow } from "~/css/styles";

export default function StoryPanel({ story }: { story: Story }) {
  return (
    <Flex className="w-full h-full justify-start items-center flex-col lg:flex-row lg:justify-center lg:items-start ">
      <Flex className="w-full h-full lg:w-1/2 justify-center pt-2 bg-white">
        <VStack className="w-full h-full justify-between" gap="gap-0">
          <Flex className="h-94% w-94% justify-center">
            <Image
              alt="story frame"
              src="/images/core/frameOneBackground.png"
              style={{ objectFit: "fill" }} // Disturb the aspect ratio
            />
          </Flex>
          <Flex className="flex-shrink-0 h-[50px]">
            <StoryNavButtons
              onNext={() => console.log("next")}
              onPrevious={() => console.log("previous")}
            />
          </Flex>
        </VStack>
      </Flex>
      <Flex className="hidden lg:flex w-full h-full lg:w-1/2 justify-center pt-2 bg-black">
        <Flex className="w-full h-full justify-center  items-center">
          <VStack className="w-full p-4" gap="gap-5">
            <Box
              className={`w-11/12 md:w-3/4 xl:w-2/3 xxl:w-1/2 h-[400px] ${borderShadow}`}
            >
              <Box className="w-full h-[400px] bg-dv-800 shadow-shadow3D p-2 overflow-y-auto">
                <Text>{story.content}</Text>
                <Text>{story.prompt}</Text>
              </Box>
            </Box>
            <Form
              method="post"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <input type="hidden" name="storyId" value={story.id} />
              <VStack gap="gap-[20px]">
                <Box className="w-11/12 md:w-3/4  xl:w-2/3  xxl:w-1/2 justify-center">
                  <TextAreaVStack
                    label="Type Things Here"
                    className="w-full h-full"
                    name="newInput"
                  />
                </Box>
                <Button type="submit" className="w-[200px]">
                  Submit
                </Button>
              </VStack>
            </Form>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
