import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import ParchmentCorner from "./parchmentCorners";
import Text from "~/components/buildingBlocks/text";
// import { StoryNavButtons } from "./storyNavButtons";
import ParchmentSpacer from "./parchmentSpacer";

export default function ParchmentPage() {
  return (
    <VStack className="w-full h-full justify-between">
      <Flex className=" h-98% w-92% md:h-96% bg-parchment shadow-parchmentShadow relative pr-2">
        <ParchmentSpacer />
        <ParchmentSpacer placement="bottom" />
        <ParchmentCorner />
        <ParchmentCorner corner="top-left" />
        <ParchmentCorner corner="top-right" />
        <ParchmentCorner corner="bottom-left" />
        <VStack
          className="w-full h-full overflow-y-auto justify-start py-[45px]"
          gap="gap-0"
        >
          <VStack className="w-full h-fit px-[40px]">
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
            <Text className="text-dv-900">
              The adventure begins as Dark Violet stumbles upon a mystical
              forest, where each tree whispers ancient tales. Guided by the
              whispers, she navigates through the enigmatic woods, uncovering
              hidden truths and mystical artifacts.
            </Text>
          </VStack>
        </VStack>
      </Flex>
      {/* <Flex className="flex-shrink-0 h-[40px] ">
        <StoryNavButtons
          onNext={() => console.log("next")}
          onPrevious={() => console.log("previous")}
        />
      </Flex> */}
    </VStack>
  );
}
