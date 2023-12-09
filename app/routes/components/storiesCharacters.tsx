import { Characters, Stories, cardColors, cursiveText } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import CardContainer from "./cardContainer";
import StoryCard from "./storyCard";
import CharacterCard from "./characterCard";
import Button from "~/components/buildingBlocks/button";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";

const tempStories = Stories;
const tempCharacters = Characters;

export default function StoriesCharacters() {
  return (
    <Flex className="w-full max-w-[1750px] p-4">
      <Flex className="flex-col w-full  xl:flex-row" style={{ height: "83vh" }}>
        {" "}
        <VStack className="w-full" gap="gap-1">
          <Text className={`${cursiveText} text-[40px]`}>My Stories</Text>
          <CardContainer>
            <VStack className="w-full">
              {tempStories.slice(0, 4).map((story, index) => {
                return (
                  <StoryCard
                    key={index}
                    story={story}
                    bgColor={cardColors[index % cardColors.length]}
                  />
                );
              })}
            </VStack>
            <Flex className="w-full justify-center py-4">
              <Button>view all</Button>
            </Flex>
          </CardContainer>
        </VStack>
        <VStack className="w-full">
          <Text className={`${cursiveText} text-[40px]`}>Current Openings</Text>
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
        </VStack>
      </Flex>
    </Flex>
  );
}
