import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import { headerFooterPadding } from "~/css/styles";
import RandomText from "~/lib/utils/randomText";
import CharacterCardMini, {
  CharacterCard,
} from "~/routes/components/characterCard";

export const tempCharacter = {
  story: {
    title: "This Story Title is Long So I Can Check Title Length",
    summary: RandomText(3, 3),
  },
  id: "1",
  name: "Character One",
  isActive: true,
  storyId: "123",
  rolePlayerId: "PlayerOne",
  description: "I am a character, and I am grand.",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function EvsPlace() {
  return (
    <Flex className={`w-full h-full justify-center ${headerFooterPadding} `}>
      <VStack className="w-full max-w-[600px] px-3 pt-[50px]">
        <CharacterCardMini character={tempCharacter} />
        <CharacterCard character={tempCharacter} />
      </VStack>
    </Flex>
  );
}
