import type { Story } from "@prisma/client";
import { Form } from "@remix-run/react";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import VStack from "~/components/buildingBlocks/vStack";
import { borderShadow } from "~/css/styles";

export default function InteractionPage({ story }: { story: Story }) {
  return (
    <Flex className="w-full h-full justify-center items-center">
      <VStack className="w-full h-full p-2 pb-4" gap="gap-5">
        <VStack className="w-full h-40% flex-shrink-0">
          <Box className={`w-full h-full ${borderShadow}`}>
            <Box className="w-full h-full bg-dv-800 shadow-shadow3D p-2 overflow-y-auto">
              <Text>{story.content}</Text>
              <Text>{story.prompt}</Text>
            </Box>
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
          <VStack className="w-full h-full" gap="gap-[20px]">
            <Flex className="w-full h-full justify-center ">
              <TextAreaVStack
                label="Type Things Here"
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
