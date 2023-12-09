import {
  Characters,
  Stories,
  borderShadow,
  cardColors,
  cursiveText,
} from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import Text from "../../components/buildingBlocks/text";
import HStack from "../../components/buildingBlocks/hStack";
import { useNavigate } from "@remix-run/react";
import VStack from "../../components/buildingBlocks/vStack";
import Image from "../../components/buildingBlocks/image";
// import GetStoryImagePath from "~/lib/utils/getStoryImagePath";
import { BsInfoSquareFill } from "react-icons/bs/index.js";
import type { Character } from "@prisma/client";
import Box from "../../components/buildingBlocks/box";
import { useState } from "react";
import Modal from "~/components/buildingBlocks/modal";
import LabelValue from "~/components/buildingBlocks/labelValue";

export default function CharacterCardMini({
  character,
  bgColor = cardColors[1 % cardColors.length],
}: {
  character: Character;
  bgColor?: string;
}) {
  const story = Stories.find((story) => story.id === character.storyId);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Flex
      className={`w-full shadow-shadow3D p-2  ${bgColor} bg-darkVioletGrad ${borderShadow}`}
      onClick={() => {
        navigate("/");
      }}
    >
      <HStack className="justify-between w-full">
        <HStack className="text-shadow-dvTextShadow">
          <VStack className="w-full" align="start" gap="gap-0">
            <Text className={`${cursiveText} text-[26px] xl:text-[33px]`}>
              {character.name}
            </Text>
            <Text className="text-shadow-dvTextShadow">
              <i>{story?.title}</i>
            </Text>
          </VStack>
        </HStack>
        <Box
          className="shadow-dvShadow h-fit"
          onClick={() => setModalOpen(true)}
        >
          <BsInfoSquareFill
            className="text-white hover:cursor-pointer w-[30px] h-[30px]"
            onClick={(e: React.MouseEvent<SVGElement>) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          />
        </Box>
      </HStack>
      <Modal
        setModalOpen={setModalOpen}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <CharacterCard character={character} />
      </Modal>
    </Flex>
  );
}

interface CharacterCardProps {
  character: Character;
}
export function CharacterCard({ character }: CharacterCardProps) {
  // const navigate = useNavigate();
  // const imagePath = GetStoryImagePath(character.storyId.title);

  const story = Stories.find((story) => story.id === character.storyId);
  const storyCharacters = Characters.filter(
    (character) => character.storyId === story?.id
  );
  const imagePath = `/images/stories/`;

  console.log("CHARACTERS: ", storyCharacters);

  return (
    <Flex
      className={`w-full h-full shadow-shadow3D text-shadow-dvTextShadow p-2 rounded-b-none bg-darkVioletGrad ${borderShadow} flex-col items-center overflow-y-auto gap-5`}
    >
      <Flex className="w-[350px] h-[500px] flex-shrink-0 shadow-dvShadow rounded-lg">
        <Image src={imagePath} alt={character.name} />
      </Flex>
      <Flex className="w-full flex-col">
        <VStack align="start w-full gap-[30px]">
          <VStack className="w-full" gap="gap-[20px]">
            <Text className={`${cursiveText} text-[43px]`}>
              {character.name}
            </Text>
            <Text className="text-center">{character.summary}</Text>
          </VStack>
          <VStack className="w-full gap-4">
            <LabelValue
              direction="flex-column"
              label="Story"
              value={story?.title || "No title available."}
              containerClassName="items-start"
              valueClassName="italic"
            />
            <LabelValue
              direction="flex-column"
              label="Story Summary"
              value={
                story?.summary ||
                "There is no summary available for this story."
              }
            />
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
