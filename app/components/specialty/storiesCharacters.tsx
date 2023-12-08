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
      <Flex className="flex-col lg:flex-row w-full">
        <CardContainer>
          <StoryCard
            title={storyOne.title}
            summary={storyOne.summary}
            link={storyOne.link}
            description={storyOne.content}
            bgColor={cardColors[0]}
          />
        </CardContainer>
        <CardContainer>
          <CharacterCard
            characterName={characterOne.name}
            story={characterOne.story}
            summary={characterOne.summary}
            link={characterOne.link}
            bgColor={cardColors[1]}
          />
        </CardContainer>
      </Flex>
    </Flex>
  );
}
