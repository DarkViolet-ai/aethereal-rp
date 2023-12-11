import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { GiCharacter } from "react-icons/gi/index.js";
import type { Character } from "@prisma/client";

export default function StoryNav({ characters }: { characters: Character[] }) {
  function CharacterTemplate({ characterName }: { characterName: string }) {
    return (
      <VStack className="py-4 px-2">
        <Text className="text-[12px]">{characterName}</Text>
        <GiCharacter />
      </VStack>
    );
  }

  return (
    <Flex className="flex-col">
      <CharacterTemplate characterName="Jehosephat" />
      <CharacterTemplate characterName="Linkorn" />
      <CharacterTemplate characterName="Chunk Face" />
      <CharacterTemplate characterName="Witch of the Southeast" />
      <CharacterTemplate characterName="Satan's Younger Sister" />
    </Flex>
  );
}
