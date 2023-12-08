import { borderShadow, cursiveText } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import Text from "../buildingBlocks/text";
import { useNavigate } from "@remix-run/react";
import GetStoryImagePath from "~/lib/utils/getStoryImagePath";
import HStack from "../buildingBlocks/hStack";
import VStack from "../buildingBlocks/vStack";
import Image from "../buildingBlocks/image";
import { Story } from "@prisma/client";

interface StoryCardProps {
  story: Story;
  bgColor: string;
}
export default function StoryCard({ story, bgColor }: StoryCardProps) {
  const navigate = useNavigate();
  const imagePath = GetStoryImagePath(story.title);
  return (
    <Flex
      className={`w-full max-w-[550px]  shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad ${borderShadow}`}
      onClick={() => {
        navigate("/");
      }}
    >
      <HStack>
        <VStack align="start">
          <Text className={`${cursiveText} text-[30px]`}>
            <i>{story.title}</i>
          </Text>
          <Text>{story.summary}</Text>
          <Text>{story.content}</Text>
        </VStack>
        <Flex className="w-[150px] flex-shrink-0">
          <Image src={imagePath} alt={story.title} />
        </Flex>
      </HStack>
    </Flex>
  );
}
