import {
  ColumnsPageColumn,
  ColumnsPageContainer,
} from "~/components/buildingBlocks/columnsPage";
import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import { topNavPadding } from "~/css/styles";
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
    <Flex className={`w-full h-full ${topNavPadding} overflow-y-auto`}>
      <ColumnsPageContainer>
        <ColumnsPageColumn
          heading="heading"
          transitionType="slideInLeft"
          containerClassName="bg-white"
        >
          Column One
        </ColumnsPageColumn>
        <ColumnsPageColumn heading="heading" transitionType="slideInLeft">
          Column Two
        </ColumnsPageColumn>
      </ColumnsPageContainer>
    </Flex>
  );
}
