import { TempCharacterList, Stories, cardColors } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import CardContainer from "./cardContainer";
import StoryCard from "./storyCard";
import CharacterCard from "./characterCard";

import VStack from "~/components/buildingBlocks/vStack";

const tempStories = Stories;
const tempCharacters = TempCharacterList;

export default function StoriesCharacters() {
  return (
    <Flex
      className="w-full h-fit xl:h-full max-w-[1750px] justify-center pt-[50px]"
      id="stories"
    >
      <Flex
        className="flex-col w-full h-full xl:flex-row xl:justify-center"
        // style={{ height: "88vh" }}
      >
        <CardContainer
          className="xxl:w-5/12 xxl:justify-end"
          heading="My Stories"
        >
          <VStack className="w-full h-fit xl:h-11/12 overflow-y-auto pb-3 px-3">
            {tempStories.map((story, index) => {
              return (
                <StoryCard
                  key={index}
                  story={story}
                  bgColor={cardColors[index % cardColors.length]}
                />
              );
            })}
          </VStack>
        </CardContainer>
        <Flex
          className="w-full h-[55px] xl:hidden text-transparent"
          id="openings"
        >
          .
        </Flex>
        <CardContainer
          className="h-fit xxl:w-7/12 xl:h-full"
          heading="Current Openings"
          id="openings"
        >
          <VStack className="w-full h-fit xl:h-11/12 overflow-y-auto pb-3 px-2">
            {tempCharacters.map((character, index) => {
              return (
                <Flex className="w-full px-2" key={index}>
                  <CharacterCard
                    character={character}
                    bgColor={cardColors[index % cardColors.length]}
                  />
                </Flex>
              );
            })}{" "}
          </VStack>
        </CardContainer>
      </Flex>
    </Flex>
  );
}
