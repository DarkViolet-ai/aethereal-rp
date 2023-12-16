import Text, { HeadingLG } from "~/components/buildingBlocks/textComponents";
import VStack from "~/components/buildingBlocks/vStack";
import { cardColors, cardWidths } from "~/css/styles";
import Box from "~/components/buildingBlocks/box";
import type { StoryCharacter } from "~/lib/db/character.server";
import { NavLink } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import Image from "~/components/buildingBlocks/image";
import useSizedImage from "~/routes/hooks/useSizedImage";
import UserOrAI from "~/components/specialty/userOrAI";

export default function Characters({
  characters,
}: {
  characters: StoryCharacter[];
}) {
  // CHARACTER TEMPLATE------------------------------------------ //
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
          className={`${cardWidths} ${cardColor} shadow-dvShadow text-dv-100 font-normal hover:text-dv-100 relative`}
        >
          <UserOrAI character={character} />
          <Box className="w-full h-full py-[1vh] px-[1vw] bg-darkenGrad shadow-shadow3D ">
            <Flex className="w-30% h-auto justify-center flex-shrink-0 p-[1vh] items-start float-left">
              <Box className="w-full shadow-dvShadow rounded-full border-2 border-dv-800 mr-[1vw]">
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
            <HeadingLG>{character.name}</HeadingLG>
            <Text className="text-shadow-dvTextShadow">
              {character.description}
            </Text>
          </Box>
        </Box>
      </NavLink>
    );
  }

  return (
    <VStack
      className={`w-full h-fit lg:h-full overflow-y-auto py-[1vh] bg-calmGrayBack bg-darkCyanGrad gap-[1vh]`}
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
