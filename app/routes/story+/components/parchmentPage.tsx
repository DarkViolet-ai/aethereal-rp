import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import ParchmentCorner from "./parchmentCorners";
import Text from "~/components/buildingBlocks/text";
// import { StoryNavButtons } from "./storyNavButtons";
import ParchmentSpacer from "./parchmentSpacer";
import { Stories } from "~/css/styles";
import { useParams } from "@remix-run/react";
import Button from "~/components/buildingBlocks/button";
import { useState } from "react";
import Modal from "~/components/buildingBlocks/modal";
import InteractionPage from "./interactionPage";

export default function ParchmentPage() {
  const params = useParams();
  const storyId = Number(params.storyId);
  const tempStory = Stories[storyId];
  const paragraphs = tempStory.content.split("\n");
  const [isModalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);

  console.log(tempStory);

  return (
    <VStack className="w-full h-full gap-[20px]">
      <Flex className=" h-90% w-92% lg:h-94% bg-parchment shadow-parchmentShadow relative pr-2">
        <ParchmentSpacer />
        <ParchmentSpacer placement="bottom" />
        <ParchmentCorner />
        <ParchmentCorner corner="top-left" />
        <ParchmentCorner corner="top-right" />
        <ParchmentCorner corner="bottom-left" />

        <VStack
          className="w-full h-full overflow-y-auto justify-start py-[45px]"
          gap="gap-0"
        >
          <VStack className="w-full h-fit px-[40px] text-dv-900">
            {paragraphs.map((paragraph, index) => (
              <Text key={index} className="text-[18px]">
                {paragraph.trim()}
              </Text>
            ))}
          </VStack>
        </VStack>
      </Flex>
      <Flex className="w-full justify-center flex lg:hidden">
        <Button onClick={() => setModalOpen(true)}>Interact</Button>
      </Flex>
      <Modal
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClose={onClose}
        showTopClose={false}
        maxWidth="max-w-[700px]"
      >
        <Flex className="w-full h-full max-w-[500px]">
          <InteractionPage story={tempStory} />
        </Flex>
      </Modal>
    </VStack>
  );
}
