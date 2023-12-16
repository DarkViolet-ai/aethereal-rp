import Text, { HeadingLG } from "~/components/buildingBlocks/textComponents";
import VStack from "~/components/buildingBlocks/vStack";
import HStack from "~/components/buildingBlocks/hStack";
import { borderShadow, cardColors, cursiveText } from "~/css/styles";
import Box from "~/components/buildingBlocks/box";
import type { StoryCharacter } from "~/lib/db/character.server";
import { Avatar } from "~/components/buildingBlocks/avatar";
import UserOrAI from "~/components/specialty/userOrAI";

export default function CharactersMenu({
  characters,
}: {
  characters: StoryCharacter[];
}) {
  // CHARACTER MENU TEMPLATE --------------------------------------------------- //

  function CharacterMenuTemplate({
    character,
    cardColor,
  }: {
    character: StoryCharacter;
    cardColor: string;
  }) {
    //const avatar = useSizedImage(character.avatar, "thumbnail");
    const _avatar =
      character.avatar && character.avatar?.length > 0
        ? character.avatar
        : "/images/icons/profileIcon.png";

    return (
      <Box className="w-96% shadow-dvShadow relative">
        <UserOrAI character={character} />
        <VStack
          className={`w-full h-full py-4 px-2 ${cardColor} ${borderShadow} bg-darkVioletGrad shadow-shadow3D `}
          align="start"
        >
          <HStack className="w-full items-center">
            <Box className="bg-dv-400 shadow-dvShadow">
              <Avatar src={_avatar} />
            </Box>
            <Text className={`${cursiveText} text-[30px] text-shadow-textFog`}>
              {character.name}
            </Text>
          </HStack>
          <Text className="text-shadow-dvTextShadow">
            {character.description}
          </Text>
        </VStack>
      </Box>
    );
  }

  // CHARACTER MENU  ------------------------------------------------------------------- //
  return (
    <VStack className={`w-full h-full `} gap="gap-0">
      <HStack className="w-full h-[6vh] bg-dv-975 bg-darkCyanGrad rounded-b-none p-[2vh] items-center border-b-2 border-dv-450">
        <HeadingLG>The Characters</HeadingLG>
      </HStack>
      <VStack className="w-full h-fit lg:h-full overflow-y-auto py-4">
        {characters.map((character, index) => (
          <CharacterMenuTemplate
            key={index}
            character={character}
            cardColor={cardColors[index % cardColors.length]}
          />
        ))}
      </VStack>
    </VStack>
  );
}
