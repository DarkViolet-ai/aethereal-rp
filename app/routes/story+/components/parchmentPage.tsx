import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import ParchmentCorner from "./parchmentCorners";
import Text from "~/components/buildingBlocks/text";
// import { StoryNavButtons } from "./storyNavButtons";
import ParchmentSpacer from "./parchmentSpacer";
import { Stories } from "~/css/styles";
import { useParams } from "@remix-run/react";

export default function ParchmentPage() {
  const params = useParams();
  const storyId = Number(params.storyId);
  const tempStory = Stories[storyId];
  const paragraphs = tempStory.content.split("\n");

  console.log(tempStory);

  return (
    <VStack className="w-full h-full justify-between">
      <Flex className=" h-94% w-92% md:h-93% bg-parchment shadow-parchmentShadow relative pr-2">
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
          <VStack className="w-full h-fit px-[40px] text-dv-900">
            {paragraphs.map((paragraph, index) => (
              <Text key={index} className="text-[18px]">
                {paragraph.trim()}
              </Text>
            ))}
          </VStack>
        </VStack>
      </Flex>
    </VStack>
  );
}
