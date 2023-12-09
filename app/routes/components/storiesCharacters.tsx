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
    <Flex className="w-full h-full max-w-[1750px] justify-center pt-[50px] ">
      <Flex
        className="flex-col w-full h-full xl:flex-row xl:justify-center"
        // style={{ height: "88vh" }}
      >
        {" "}
        <CardContainer>
          <VStack className="w-full" gap="gap-5">
            <Text className={`${cursiveText} text-[40px]`}>My Stories</Text>{" "}
            {/* SMALL SCREENS */}
            <VStack className="w-full flex xl:hidden" gap="gap-3">
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
            {/* LARGE SCREENS */}
            <VStack className="w-full hidden xl:flex" gap="gap-3">
              {tempStories.slice(0, 5).map((story, index) => {
                return (
                  <StoryCard
                    key={index}
                    story={story}
                    bgColor={cardColors[index % cardColors.length]}
                  />
                );
              })}
            </VStack>
            <Flex className="w-full justify-center py-3">
              <Button>view all</Button>
            </Flex>{" "}
          </VStack>
        </CardContainer>
        <CardContainer>
          <VStack className="w-full h-full" gap="gap-5">
            <Text className={`${cursiveText} text-[40px]`}>
              Current Openings
            </Text>
            <VStack className="w-full">
              {tempCharacters.map((character, index) => {
                return (
                  <CharacterCard
                    key={index}
                    character={character}
                    bgColor={cardColors[index % cardColors.length]}
                  />
                );
              })}{" "}
            </VStack>
          </VStack>
        </CardContainer>
      </Flex>
    </Flex>
  );
}
