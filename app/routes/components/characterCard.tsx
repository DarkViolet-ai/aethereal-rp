import {
  TempCharacterList,
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
import GetStoryImagePath from "~/lib/utils/getStoryImagePath";
import Divider from "~/components/buildingBlocks/divider";

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
          <Flex className="w-full flex-col items-start md:flex-row lg:flex-col xxl:flex-row">
            <Text className={`${cursiveText} text-[26px] xl:text-[33px]`}>
              {character.name}
            </Text>
            <Flex className="hidden md:flex lg:hidden xxl:flex px-2">
              <Text> | </Text>
            </Flex>
            <Text className="text-shadow-dvTextShadow">
              <i>{story?.title}</i>
            </Text>
          </Flex>
        </HStack>
        <Box
          className="shadow-dvShadow h-fit"
          onClick={() => setModalOpen(true)}
        >
          <BsInfoSquareFill
            className="text-white hover:cursor-pointer w-[30px] h-[30px] hover:text-dv-400 transition:all duration-300 ease-in-out"
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
  const storyCharacters = TempCharacterList.filter(
    (otherCharacter) =>
      otherCharacter.storyId === character.storyId &&
      otherCharacter.id !== character.id
  );
  const imagePath = GetStoryImagePath(story?.title || "");
  const paragraphs = story?.content.split("\n");
  // console.log("character: ", character);
  // console.log("story: ", story);

  return (
    <Flex className="w-full h-fit lg:h-full items-center lg:items-start lg:overflow-y-hidden flex-col gap-5 lg:flex-row bg-dv-950 p-3 lg:pt-5">
      <Flex className="w-full lg:w-40% justify-center lg:h-full lg:items-center">
        <VStack className="w-full h-full gap-4">
          <Flex className="w-[350px] h-[500px] flex-shrink-0 shadow-dvShadow rounded-lg ">
            <Image src={imagePath} alt={character.name} w="100%" h="100%" />
          </Flex>
          <VStack className="w-full" gap="gap-[20px]">
            <Text className={`${cursiveText} text-[43px] mt-4`}>
              {character.name}
            </Text>

            {/* Figure out this typescript issue. Summary is on the data and renders, but Typescript does not believe. */}
            <Text className="text-center">{character.summary}</Text>
          </VStack>
          <Divider />
          <LabelValue
            label="Story"
            value={story?.title || "No title available."}
            containerClassName="items-start lg:items-center"
            valueClassName="italic"
          />
          <Divider className="flex lg:hidden" />
        </VStack>
      </Flex>
      <Flex className="w-full flex-col lg:w-60% lg:h-full lg:overflow-y-auto lg:px-6">
        <VStack align="start w-full gap-[30px]">
          {/* STORY TAGS */}

          <VStack className="w-full gap-4 px-2 pb-2 h-fit ">
            <VStack className="w-full gap-0">
              <LabelValue label="Other Characters" />
              <Flex className="w-full">
                <VStack className="w-full px-4" align="start">
                  {storyCharacters.map((character, index) => (
                    <LabelValue
                      key={index}
                      direction="flex-row"
                      label={storyCharacters[index].name}
                      value={storyCharacters[index].summary}
                    />
                  ))}
                </VStack>
              </Flex>
            </VStack>
            <Divider />
            <VStack className="w-full gap-0">
              <LabelValue
                label="Story Summary"
                value={
                  story?.summary ||
                  "There is no summary available for this story."
                }
              />
              <VStack className="w-full h-fit overflow-y-auto">
                {paragraphs?.map((paragraph, index) => (
                  <Text key={index} className="text-[18px]">
                    {paragraph.trim()}
                  </Text>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
