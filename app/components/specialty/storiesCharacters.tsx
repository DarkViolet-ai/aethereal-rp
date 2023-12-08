import { Characters, Stories } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import CardContainer from "./cardContainer";

const storyOne = Stories[0];
const characterOne = Characters[0];

export default function StoriesCharacters() {
  return (
    <Flex className="w-full max-w-[1750px] p-4">
      <Flex className="flex-col lg:flex-row bg-dv-625 shadow-shadow3D w-full">
        <CardContainer></CardContainer>
        <CardContainer></CardContainer>
      </Flex>
    </Flex>
  );
}
