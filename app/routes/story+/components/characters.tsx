import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import HStack from "~/components/buildingBlocks/hStack";
import {
  borderShadow,
  cardColors,
  cardWidths,
  cursiveText,
  headingSizes,
} from "~/css/styles";
import Box from "~/components/buildingBlocks/box";
import type { StoryCharacter } from "~/lib/db/character.server";
import { NavLink } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import Image from "~/components/buildingBlocks/image";
import useSizedImage from "~/routes/hooks/useSizedImage";

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
    const avatar = useSizedImage(character.id, "thumbnail");
    const _avatar =
      character.avatar && avatar && avatar?.length > 0
        ? avatar
        : "/images/icons/profileIcon.png";
    return (
      <NavLink
        to={`/story/${character.storyId}/${character.id}`}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          className={`${cardWidths} shadow-dvShadow text-dv-100 font-normal hover:text-dv-100`}
        >
          <Flex
            className={`w-full h-full p-4  ${cardColor} ${borderShadow} bg-darkenGrad shadow-shadow3D `}
          >
            <HStack className="w-full items-center ">
              <Flex className="w-30% h-auto justify-center flex-shrink-0 p-2">
                <Box className="w-full shadow-shadow3D rounded-full border-2 border-dv-800">
                  <Image
                    alt={character.name}
                    className="rounded-full"
                    rounded="full"
                    borderRadius="full"
                    src={_avatar}
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Flex>
              <VStack align="start" className="w-70%">
                <Text
                  className={`${cursiveText} text-shadow-textFog ${headingSizes}`}
                >
                  {character.name}
                </Text>
                <Text className="text-shadow-dvTextShadow">
                  {character.description}
                </Text>
              </VStack>
            </HStack>
          </Flex>
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
