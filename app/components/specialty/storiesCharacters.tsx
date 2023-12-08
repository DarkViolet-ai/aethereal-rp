import { Characters, Stories, cardColors } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import CardContainer from "./cardContainer";
import StoryCard from "./storyCard";
import CharacterCard from "./characterCard";

const storyOne = Stories[0];
const characterOne = Characters[0];

export default function StoriesCharacters() {
  return (
    <Flex className="w-full max-w-[1750px] p-4">
      <Flex className="flex-col lg:flex-row bg-dv-625 shadow-shadow3D w-full">
        <CardContainer>
          <StoryCard
            title={storyOne.title}
            summary={storyOne.summary}
            image={storyOne.image}
            link={storyOne.link}
            bgColor={cardColors[0]}
          />
        </CardContainer>
        <CardContainer>
          <CharacterCard
            characterName={characterOne.name}
            title={}
            summary={characterOne.summary}
            image={characterOne.image}
          />
        </CardContainer>
      </Flex>
    </Flex>
  );
}
