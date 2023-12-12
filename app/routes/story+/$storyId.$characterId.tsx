import { Stories, cursiveText } from "~/css/styles";
import Flex from "~/components/buildingBlocks/flex";
import ParchmentPage from "./components/parchmentPage";
import InteractionPage from "./components/interactionPage";
import Transition from "~/components/buildingBlocks/transition";
import { useParams } from "@remix-run/react";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";

export default function StoryId() {
  const params = useParams();
  const storyId = Number(params.storyId);
  const tempStory = Stories[storyId];

  // console.log(tempStory);
  return (
    // <Transition type="zoom" className="w-full h-full">
    <Flex className="w-full h-full justify-start items-center flex-col lg:flex-row lg:justify-center lg:items-start pt-7 overflow-y-hidden">
      <Transition type="fade" className="w-full h-full lg:w-7/12 ">
        <VStack className="w-full h-full justify-center py-[5px]">
          <Text
            className={`${cursiveText} text-[33px] md:text-[40px] lg:text-[28px] xl:text-[32px] xxl:text-[34px] text-shadow-textFog`}
          >
            {tempStory.title}
          </Text>
          <ParchmentPage />
        </VStack>
      </Transition>
      <Transition
        type="fade"
        delay={0.3}
        className="hidden lg:flex w-full h-full lg:w-5/12 justify-center pt-2"
        duration={0.7}
      >
        <InteractionPage story={tempStory} />
      </Transition>
    </Flex>
    // </Transition>
  );
}
