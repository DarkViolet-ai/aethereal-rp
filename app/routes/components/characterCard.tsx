import { borderShadow, cardColors, cursiveText } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import Text from "../../components/buildingBlocks/textComponents";
import HStack from "../../components/buildingBlocks/hStack";
import { NavLink } from "@remix-run/react";
import VStack from "../../components/buildingBlocks/vStack";
import Image from "../../components/buildingBlocks/image";
import { useState } from "react";
import Modal from "~/components/buildingBlocks/modal";
import LabelValue from "~/components/buildingBlocks/labelValue";
import Divider from "~/components/buildingBlocks/divider";
import type { OpenCharacterView } from "~/lib/db/character.server";
import { Avatar } from "~/components/buildingBlocks/avatar";
import Button from "~/components/buildingBlocks/button";
import useSizedImage from "../hooks/useSizedImage";

export function CharacterCardMini({
  character,
  bgColor = cardColors[1 % cardColors.length],
}: {
  character: OpenCharacterView;
  bgColor?: string;
}) {
  const avatar = useSizedImage(character.id, "thumbnail");
  const _avatar =
    character.avatar && avatar && avatar?.length > 0
      ? avatar
      : "/images/icons/profileIcon.png";

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <Flex
      className={`w-full h-fit shadow-shadow3D p-2 ${bgColor} bg-darkVioletGrad hover:cursor-pointer ${borderShadow} `}
      onClick={() => setModalOpen(true)}
    >
      <HStack className="justify-between w-full">
        <Avatar size="lg" src={_avatar} />

        <VStack
          className="w-full text-shadow-dvTextShadow"
          align="start"
          gap="gap-0"
        >
          <Text className={`${cursiveText} text-[25px] xxl:text-[28px]`}>
            {character.name}
          </Text>

          <Text className="text-shadow-dvTextShadow text-[20px]">
            <i>{character.story?.title}</i>
          </Text>
        </VStack>
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
  character: OpenCharacterView;
}
export function CharacterCard({ character }: CharacterCardProps) {
  const avatar = useSizedImage(character.id, "medium");
  const imagePath =
    character.avatar && avatar && avatar?.length > 0
      ? avatar
      : "/images/placeholderImage.png";
  const story = character.story;

  // add character imagePath
  //const imagePath = "/images/placeholderImage.png";

  return (
    <Flex className="w-full h-fit min-h-full lg:h-full items-center lg:items-start lg:overflow-y-hidden flex-col gap-5 lg:flex-row bg-dv-950 p-3 lg:pt-[50px] rounded-b-none">
      <Flex className="h-50vh w-50vh flex-shrink-0 shadow-dvShadow rounded-lg lg:w-1/2 lg:h-auto">
        <Image src={imagePath} alt={character.name} w="100%" h="100%" />
      </Flex>
      <VStack className="w-full lg:w-1/2 flex-shrink-0 gap-[50px]">
        <Flex className="w-full justify-center lg:h-full lg:items-center px-3">
          <VStack className="w-full h-full">
            <VStack className="w-full" gap="gap-[20px]">
              <Text className={`${cursiveText} text-[43px] mt-4`}>
                {character.name}
              </Text>
              <Text className="text-center">{character.description}</Text>
            </VStack>
            <Divider />
            <LabelValue
              label="Story Title"
              value={story?.title || "No title available."}
              containerClassName="items-center"
              valueClassName="italic"
            />
            <Divider className="flex lg:hidden" />
          </VStack>
        </Flex>

        <VStack align="start w-full gap-[30px]">
          <NavLink
            to={`/story/${character.storyId}/${character.id}`}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button>Story Details</Button>
          </NavLink>
          <NavLink
            to={`/story/${character.storyId}/${character.id}`}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button>Play Role</Button>
          </NavLink>
          <Flex className="w-full justify-center">
            <NavLink
              to={`/playground/image-create/character/${character.id}`}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button>Generate Image</Button>
            </NavLink>
          </Flex>
        </VStack>
      </VStack>
    </Flex>
  );
}
