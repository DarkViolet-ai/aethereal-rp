import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import ParchmentCorner from "./parchmentCorners";
import Text from "~/components/buildingBlocks/text";
import { StoryNavButtons } from "./storyNavButtons";

export default function ParchmentPage() {
  return (

      <VStack
        className="w-full h-full justify-between items-center"
        gap="gap-1"
      >
        <Flex className="h-90% w-92% justify-center bg-parchment shadow-parchmentShadow relative">
          <ParchmentCorner />
          <ParchmentCorner corner="top-left" />
          <ParchmentCorner corner="top-right" />
          <ParchmentCorner corner="bottom-left" />
          <Text>STORY</Text>
        </Flex>
        <Flex className="flex-shrink-0 h-[40px] ">
          <StoryNavButtons
            onNext={() => console.log("next")}
            onPrevious={() => console.log("previous")}
          />
        </Flex>
      </VStack>

  );
}
