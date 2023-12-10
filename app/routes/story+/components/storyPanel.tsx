import type { Story } from "@prisma/client";
import Box from "~/components/buildingBlocks/box";
import Flex from "~/components/buildingBlocks/flex";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";

export default function StoryPanel({ story }: { story: Story }) {
  return (
    <Flex className="w-full h-full justify-start items-center flex-col xl:flex-row xl:justify-center xl:items-start ">
      <Flex className="w-full h-full xl:w-1/2 justify-center pt-3">
        <VStack className="w-full h-full">
          <Box className="h-90 w-auto bg-white">
            test
            {/* <Image
              alt="story frame"
              objectFit="contain"
              src="/images/core/frameOneBackground.png"
              className="h-full w-auto object-contain" // Apply Tailwind classes here
            /> */}
          </Box>
          <Box>NAVIGATION</Box>
        </VStack>
      </Flex>
      <Flex className="hidden xl:flex">Story Panel 2</Flex>
    </Flex>
  );
}
