import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import ParchmentCorner from "./parchmentCorners";
import Text from "~/components/buildingBlocks/textComponents";
import ParchmentSpacer from "./parchmentSpacer";
import { cardWidths, colMaxWidths } from "~/css/styles";
import Button from "~/components/buildingBlocks/button";
import { useState } from "react";
import Modal from "~/components/buildingBlocks/modal";
import InteractionPage from "./interactionPage";
import type { StoryData } from "~/lib/db/story.server";

interface ParchmentPageProps {
  showInteractionButton?: boolean;
  isActiveCharacter: boolean;
  story: StoryData;
  characterName: string;
}

export default function ParchmentPage({
  story,
  showInteractionButton = true,
  isActiveCharacter,
  characterName,
}: ParchmentPageProps) {
  const paragraphs = story.content.split("\n");
  const [isModalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);

  return (
    <VStack className="w-full h-full">
      <Flex
        className={`h-90% w-92% lg:h-94% bg-parchment shadow-parchmentShadow relative pr-2 ${colMaxWidths}`}
      >
        <ParchmentSpacer />
        <ParchmentSpacer placement="bottom" />
        <ParchmentCorner />
        <ParchmentCorner corner="top-left" />
        <ParchmentCorner corner="top-right" />
        <ParchmentCorner corner="bottom-left" />

        <VStack
          className="w-full h-full overflow-y-auto justify-start py-[3vh]"
          gap="gap-0"
        >
          <VStack className={`w-full h-fit px-[4vw] text-dv-900 gap-[1vh] `}>
            {paragraphs.map((paragraph, index) => (
              <Flex key={index} className={`${cardWidths}`}>
                <Text>{paragraph.trim()}</Text>
              </Flex>
            ))}
          </VStack>
        </VStack>
      </Flex>
      {showInteractionButton && (
        <Flex className="w-full justify-center flex lg:hidden pt-[20px]">
          <Button onClick={() => setModalOpen(true)}>Interact</Button>
        </Flex>
      )}
      <Modal
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClose={onClose}
        showTopClose={false}
        maxWidth="max-w-[700px]"
      >
        <Flex className="w-full h-full max-w-[500px]">
          <InteractionPage
            story={story}
            isActiveCharacter={isActiveCharacter}
            characterName={characterName}
          />
        </Flex>
      </Modal>
    </VStack>
  );
}
