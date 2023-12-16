import {
  cardColors,
  cardWidths,
  colMaxWidths,
  topNavPadding,
} from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import CardContainer from "./cardContainer";
import StoryCard from "./storyCard";
import { CharacterCardMini } from "./characterCard";

import VStack from "~/components/buildingBlocks/vStack";
import { useTypedLoaderData } from "remix-typedjson";
import type { UserStoriesLoaderData } from "..";
import NewStoryCard from "../story+/components/newStoryCard";
import Transition from "~/components/buildingBlocks/transition";
import { NavLink } from "@remix-run/react";

export default function StoriesCharacters() {
  const { stories, activeStories, availableCharacters } =
    useTypedLoaderData<UserStoriesLoaderData>();
  const allStories = [...activeStories, ...stories];
  return (
    <Flex
      className={`w-full h-fit lg:h-full justify-center ${topNavPadding} overflow-x-hidden`}
      id="stories"
    >
      <Flex className="w-full h-fit flex-col lg:flex-row gap-[40px] lg:h-full lg:gap-[10px] py-1 quadHD:py-3">
        <Transition
          type="slideInLeft"
          className="w-full h-full lg:w-1/2 flex justify-center"
          duration={0.6}
        >
          <Flex className={`${colMaxWidths}`}>
            <CardContainer className={`w-full`} heading="My Stories">
              <Flex
                className={`w-full h-fit lg:full overflow-y-auto justify-center`}
              >
                <VStack className={`w-full gap-[2vh] py-[1vh] px-[2vw]`}>
                  <NavLink
                    to="/story/new"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <NewStoryCard />
                  </NavLink>
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
          </Flex>
        </Transition>
        <Flex
          className="w-full h-[10px] lg:hidden text-transparent"
          id="openings"
        >
          .
        </Flex>
        <Transition
          type="slideInRight"
          className="w-full h-full lg:w-1/2 flex justify-center"
          duration={0.8}
          delay={0.2}
        >
          <Flex className={`${colMaxWidths}`}>
            <CardContainer
              className={`w-full`}
              heading="Current Openings"
              id="openings"
            >
              <VStack className="w-full h-fit lg:h-full overflow-y-auto gap-[2vh] py-[1vh] px-[2vw]`}">
                {availableCharacters.map((character, index) => {
                  return (
                    <Flex className={`w-full px-2 ${cardWidths}`} key={index}>
                      <CharacterCardMini
                        character={character}
                        bgColor={cardColors[index % cardColors.length]}
                      />
                    </Flex>
                  );
                })}{" "}
              </VStack>
            </CardContainer>
          </Flex>
        </Transition>
      </Flex>
    </Flex>
  );
}
