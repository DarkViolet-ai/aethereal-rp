import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { GiCharacter } from "react-icons/gi/index.js";
import type { Character } from "@prisma/client";
import HStack from "~/components/buildingBlocks/hStack";
import { Stories, borderShadow, cardColors, cursiveText } from "~/css/styles";
import Box from "~/components/buildingBlocks/box";
import { NavLink, useParams } from "@remix-run/react";

export default function Characters({
  characters,
  link,
}: {
  characters: Character[];
  link: string;
}) {
  const params = useParams();
  const characterId = Number(params.characterId);
  const character = characters.find(
    (character) => Number(character.id) === characterId
  );
  const story = Stories.find((story) => story.id === character?.storyId);

  function CharacterTemplate({
    character,
    cardColor,
  }: {
    character: Character;
    cardColor: string;
  }) {
    console.log("CHAR: ", character);
    return (
      <Box className="w-96% shadow-dvShadow hover:cursor-pointer">
        <VStack
          className={`w-full h-full py-4 px-2 ${cardColor} ${borderShadow} bg-darkVioletGrad shadow-shadow3D `}
          align="start"
        >
          <HStack className="w-full items-center">
            <Box className="bg-dv-400 shadow-dvShadow">
              <GiCharacter className="text-dv-800 text-[33px]" />
            </Box>
            <Text className={`${cursiveText} text-[30px] text-shadow-textFog`}>
              {character.name}
            </Text>
          </HStack>
          <Text className="text-shadow-dvTextShadow">{character.summary}</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <VStack className={`w-full h-full `} gap="gap-0">
      <HStack className="w-full h-[70px] bg-dv-975 bg-darkCyanGrad rounded-b-none p-3 items-center border-b-2 border-dv-450">
        <Text className={`${cursiveText} text-[40px] text-shadow-textFog`}>
          The Characters
        </Text>
      </HStack>
      <VStack className="w-full h-fit lg:h-full overflow-y-auto py-4">
        {characters.map((character, index) => (
          <CharacterTemplate
            key={index}
            character={character}
            cardColor={cardColors[index % cardColors.length]}
          />
        ))}
      </VStack>
    </VStack>
  );
}
