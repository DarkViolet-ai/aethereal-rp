import { borderShadow, cursiveText } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import Text from "../buildingBlocks/text";
import { useNavigate } from "@remix-run/react";
import GetStoryImagePath from "~/lib/utils/getStoryImagePath";
import HStack from "../buildingBlocks/hStack";
import VStack from "../buildingBlocks/vStack";
import Image from "../buildingBlocks/image";
import Box from "../buildingBlocks/box";

interface StoryCardProps {
  title: string;
  summary: string;
  description?: string;
  link: string;
  bgColor: string;
}
export default function StoryCard({
  title,
  summary,
  description,
  link,
  bgColor,
}: StoryCardProps) {
  const navigate = useNavigate();
  const imagePath = GetStoryImagePath(title);
  return (
    <Flex
      className={`w-full max-w-[550px]  shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad ${borderShadow}`}
      onClick={() => {
        navigate(link);
      }}
    >
      <HStack>
        <VStack align="start">
          <Text className={`${cursiveText} text-[30px]`}>
            <i>{title}</i>
          </Text>
          <Text>{summary}</Text>
          <Text>{description}</Text>
        </VStack>
        <Flex className="w-[150px] flex-shrink-0">
          <Image src={imagePath} alt={title} />
        </Flex>
      </HStack>
    </Flex>
  );
}
