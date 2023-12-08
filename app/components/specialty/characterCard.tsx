import { borderShadow, cardColors, cursiveText } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import Text from "../buildingBlocks/text";
import HStack from "../buildingBlocks/hStack";
import { useNavigate } from "@remix-run/react";
import VStack from "../buildingBlocks/vStack";
import Image from "../buildingBlocks/image";
import GetStoryImagePath from "~/lib/utils/getStoryImagePath";

interface CharacterCardProps {
  characterName: string;
  story: string;
  summary: string;
  link: string;
  bgColor: string;
}
export default function CharacterCard({
  characterName,
  story,
  summary,
  link,
  bgColor = cardColors[1 % cardColors.length],
}: CharacterCardProps) {
  const navigate = useNavigate();
  const imagePath = GetStoryImagePath(story);
  console.log(imagePath);
  return (
    <Flex
      className={`w-full max-w-[550px]  shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad ${borderShadow}`}
      onClick={() => {
        navigate(link);
      }}
    >
      <HStack>
        <VStack align="start">
          <Text className={`${cursiveText} text-[30px]`}>{characterName}</Text>
          <Text className="text-shadow-dvTextShadow">
            <i>{story}</i>
          </Text>
          <Text>{summary}</Text>
        </VStack>
        <Flex className="w-[150px] flex-shrink-0">
          <Image src={imagePath} alt={characterName} />
        </Flex>
      </HStack>
    </Flex>
  );
}
