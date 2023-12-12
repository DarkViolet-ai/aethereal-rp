import { cardColors, cardWidths, colMaxWidths } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import CardContainer from "./cardContainer";
import StoryCard from "./storyCard";
import CharacterCard from "./characterCard";

import VStack from "~/components/buildingBlocks/vStack";
import { useTypedLoaderData } from "remix-typedjson";
import type { UserStoriesLoaderData } from "../index";
import NewStoryCard from "../story+/components/newStoryCard";
import Transition from "~/components/buildingBlocks/transition";

export default function StoriesCharacters() {
  const { stories, activeStories, availableCharacters } =
    useTypedLoaderData<UserStoriesLoaderData>();
  const allStories = [...activeStories, ...stories];
  return (
    <Flex
      className="w-full h-fit lg:h-full justify-center pt-[50px]"
      id="stories"
    >
      <Flex className="w-full h-fit lg:h-98% flex-col lg:flex-row gap-[40px] lg:gap-[10px] ">
        <Transition
          type="slideInBottom"
          className="w-full h-full lg:w-1/2 px-4 flex justify-center"
          duration={0.6}
        >
          <CardContainer
            className={`w-full ${colMaxWidths}`}
            heading="My Stories"
          >
            <Flex
              className={`w-full h-fit lg:full overflow-y-auto justify-center`}
            >
              <VStack className={`w-full py-3 px-3 gap-4 ${cardWidths}`}>
                <NewStoryCard />
                {allStories.map((story, index) => {
                  return (
                    <StoryCard
                      key={index}
                      story={story}
                      bgColor={cardColors[index % cardColors.length]}
                    />
                  );
                })}
              </VStack>
            </Flex>
          </CardContainer>
        </Transition>
        <Flex
          className="w-full h-[55px] lg:hidden text-transparent"
          id="openings"
        >
          .
        </Flex>
        <Transition
          type="slideInTop"
          className="w-full h-full lg:w-1/2 px-4 flex justify-center"
          duration={0.8}
          delay={0.2}
        >
          <CardContainer
            className={`w-full ${colMaxWidths}`}
            heading="Current Openings"
            id="openings"
          >
            <VStack className="w-full h-fit lg:h-full overflow-y-auto pb-3 px-2">
              {availableCharacters.map((character, index) => {
                return (
                  <Flex className={`w-full px-2 ${cardWidths}`} key={index}>
                    <CharacterCard
                      character={character}
                      bgColor={cardColors[index % cardColors.length]}
                    />
                  </Flex>
                );
              })}{" "}
            </VStack>
          </CardContainer>
        </Transition>
      </Flex>
    </Flex>
  );
}
