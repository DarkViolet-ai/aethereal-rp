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
    <Flex className="w-full h-full justify-center  items-center">
      <VStack className="w-full p-4" gap="gap-5">
        <Box className={`w-full h-[400px] ${borderShadow}`}>
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
            <Box className="w-full justify-center">
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
  );
}
