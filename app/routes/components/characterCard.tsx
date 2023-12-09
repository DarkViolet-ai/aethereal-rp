import { borderShadow, cardColors, cursiveText } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import Text from "../../components/buildingBlocks/text";
import HStack from "../../components/buildingBlocks/hStack";
import { useNavigate } from "@remix-run/react";
import VStack from "../../components/buildingBlocks/vStack";
import Image from "../../components/buildingBlocks/image";
import GetStoryImagePath from "~/lib/utils/getStoryImagePath";
import { BsInfoSquareFill } from "react-icons/bs/index.js";
import type { Character } from "@prisma/client";
import Box from "../../components/buildingBlocks/box";

export default function CharacterCardMini({
  character,
  bgColor = cardColors[1 % cardColors.length],
}: {
  character: Character;
  bgColor?: string;
}) {
  const navigate = useNavigate();
  return (
    <Flex
      className={`w-full max-w-[550px]  shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad ${borderShadow}`}
      onClick={() => {
        navigate("/");
      }}
    >
      <HStack className="justify-between w-full">
        <HStack className="text-shadow-dvTextShadow">
          <Text className={`${cursiveText} text-[26px]`}>{character.name}</Text>
          <Text className="text-shadow-dvTextShadow">
            <i>{character.storyId}</i>
          </Text>
        </HStack>
        <Box className="shadow-dvShadow">
          <BsInfoSquareFill
            className="text-white hover:cursor-pointer w-[30px] h-[30px]"
            onClick={() => {
              navigate("/");
            }}
          />
        </Box>
      </HStack>
    </Flex>
  );
}

interface CharacterCardProps {
  character: Character;
  bgColor: string;
}
export function CharacterCard({
  character,
  bgColor = cardColors[1 % cardColors.length],
}: CharacterCardProps) {
  const navigate = useNavigate();
  const imagePath = GetStoryImagePath(character.storyId);
  console.log(imagePath);
  return (
    <Flex
      className={`w-full max-w-[550px]  shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad ${borderShadow}  hover:cursor-pointer`}
      onClick={() => {
        navigate("/");
      }}
    >
      <HStack>
        <VStack align="start">
          <Text className={`${cursiveText} text-[30px]`}>{character.name}</Text>
          <Text className="text-shadow-dvTextShadow">
            <i>{character.storyId}</i>
          </Text>
          <Text>{character.summary}</Text>
        </VStack>
        <Flex className="w-[150px] flex-shrink-0">
          <Image src={imagePath} alt={character.name} />
        </Flex>
      </HStack>
    </Flex>
  );
}
