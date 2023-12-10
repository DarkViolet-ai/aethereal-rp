import { Stories } from "~/css/styles";
import Flex from "~/components/buildingBlocks/flex";
import ParchmentPage from "./components/parchmentPage";
import InteractionPage from "./components/interactionPage";

export default function StoryId() {
  const tempStory = Stories[0];
  return (
    <Flex className="w-full h-full justify-start items-center flex-col lg:flex-row lg:justify-center lg:items-start ">
      <Flex className="w-full h-full lg:w-7/12 justify-center pt-[30px] pb-[5px]">
        <ParchmentPage />
      </Flex>
      <Flex className="hidden lg:flex w-full h-full lg:w-5/12 justify-center pt-2">
        <InteractionPage story={tempStory} />
      </Flex>
    </Flex>
  );
}
