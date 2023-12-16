import { borderShadow, cardColors } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import Text, {
  Heading3XL,
  HeadingLG,
  HeadingMD,
  TextLG,
} from "../../components/buildingBlocks/textComponents";
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
import Box from "~/components/buildingBlocks/box";

// CHARACTER CARD MINI --------------------------------------------------------- //

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
      className={`w-full h-fit shadow-shadow3D px-[1vw] py-[1vh] ${bgColor} bg-darkVioletGrad hover:cursor-pointer ${borderShadow} `}
      onClick={() => setModalOpen(true)}
    >
      <HStack className="justify-between w-full gap-[1vw]">
        <Avatar size="lg" src={_avatar} />

        <VStack
          className="w-full text-shadow-dvTextShadow"
          align="start"
          gap="gap-0"
        >
          <Flex className="flex md:hidden">
            <HeadingMD>{character.name}</HeadingMD>
          </Flex>
          <Flex className="hidden md:flex">
            <HeadingLG>{character.name}</HeadingLG>
          </Flex>

          <Text className="text-shadow-dvTextShadow]">
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

// CHARACTER CARD MAIN --------------------------------------------------------- //

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
    <Flex className="w-full h-full overflow-y-auto overflow-x-hidden rounded-b-none">
      <Flex className="w-full h-fit min-h-full bg-dv-950 rounded-b-none flex-col lg:flex-row lg:h-full pt-[2vh] pb-[7vh] gap-[2vh] lg:gap-[0px]">
        <Flex className="w-full h-fit justify-center lg:1/2 lg:h-full lg:items-center">
          <Box className="w-80% h-auto lg:h-80% lg:w-70% shadow-dvShadow ">
            <Image src={imagePath} alt={character.name} w="100%" h="100%" />
          </Box>
        </Flex>
        <Flex className="w-full h-fit justify-center lg:1/2 lg:h-full lg:items-center lg:overflow-hidden">
          <Flex className="w-full justify-center lg:h-full lg:items-center px-3">
            <VStack
              className="w-full"
              gap="gap-[15px] lg:gap-[5vh] lg:pr-[2vw] lg:h-full lg:justify-evenly quadHD:gap-[5vh]"
            >
              <Flex className="w-full flex lg:hidden justify-center">
                <HeadingLG>{character.name}</HeadingLG>{" "}
              </Flex>
              <Flex className="w-full hidden lg:flex justify-center">
                <Heading3XL>{character.name}</Heading3XL>{" "}
              </Flex>
              <TextLG>{character.description}</TextLG>

              <Divider />
              <LabelValue
                label="Story Title"
                value={story?.title || "No title available."}
                containerClassName="items-center"
                valueClassName="italic"
              />
              <Divider className="hidden lg:flex" />
              <HStack className="w-full justify-evenly">
                <NavLink to={`/story/char-select/${character.storyId}`}>
                  <Button>Story Details</Button>
                </NavLink>
                <NavLink to={`/story/${character.storyId}/${character.id}`}>
                  <Button>Play Role</Button>
                </NavLink>
                <NavLink
                  to={`/playground/image-create/character/${character.id}`}
                >
                  <Button width="w-fit">img</Button>
                </NavLink>
              </HStack>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
