import { Characters, Stories, cardColors } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import CardContainer from "./cardContainer";
import StoryCard from "./storyCard";
import CharacterCard from "./characterCard";

const tempStories = Stories;
const tempCharacters = Characters;

export default function StoriesCharacters() {
  return (
    <Flex className="w-full max-w-[1750px] p-4">
      <Flex className="flex-col lg:flex-row w-full">
        <CardContainer>
          {tempStories.map((story, index) => {
            return (
              <StoryCard
                key={index}
                story={story}
                bgColor={cardColors[index % cardColors.length]}
              />
            );
          })}
        </CardContainer>
        <CardContainer>
          {tempCharacters.map((character, index) => {
            return (
              <CharacterCard
                key={index}
                character={character}
                bgColor={cardColors[index % cardColors.length]}
              />
            );
          })}
        </CardContainer>
      </Flex>
    </Flex>
  );
}
