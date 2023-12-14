import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { GiCharacter } from "react-icons/gi/index.js";
import HStack from "~/components/buildingBlocks/hStack";
import {
  borderShadow,
  cardColors,
  cardWidths,
  cursiveText,
} from "~/css/styles";
import Box from "~/components/buildingBlocks/box";
import type { StoryCharacter } from "~/lib/db/character.server";
import { NavLink } from "@remix-run/react";

export default function Characters({
  characters,
}: {
  characters: StoryCharacter[];
}) {
  function CharacterTemplate({
    character,
    cardColor,
  }: {
    character: StoryCharacter;
    cardColor: string;
  }) {
    console.log("CHAR: ", character);
    return (
      <NavLink
        to={`/story/${character.storyId}/${character.id}`}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          className={`${cardWidths} shadow-dvShadow text-dv-100 font-normal hover:text-dv-100`}
        >
          <VStack
            className={`w-full h-full py-4 px-2 ${cardColor} ${borderShadow} bg-darkenGrad shadow-shadow3D `}
            align="start"
          >
            <HStack className="w-full items-center">
              <Box className="bg-dv-400 shadow-dvShadow">
                <GiCharacter className="text-dv-800 text-[33px]" />
              </Box>
              <Text
                className={`${cursiveText} text-[30px] text-shadow-textFog`}
              >
                {character.name}
              </Text>
            </HStack>
            <Text className="text-shadow-dvTextShadow">
              {character.description}
            </Text>
          </VStack>
        </Box>
      </NavLink>
    );
  }

  return (
    <VStack
      className={`w-full h-fit lg:h-full overflow-y-auto py-4 bg-calmGrayBack bg-darkCyanGrad`}
    >
      {characters.map((character, index) => (
        <CharacterTemplate
          key={index}
          character={character}
          cardColor={cardColors[index % cardColors.length]}
        />
      ))}
    </VStack>
  );
}
