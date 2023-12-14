import {
  borderShadow,
  cursiveText,
  columnHeaderSizes,
  textSizes,
  headingSizes,
  cardWidths,
  containerPadding,
} from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import Text from "../../components/buildingBlocks/text";
import { useNavigate } from "@remix-run/react";
import HStack from "../../components/buildingBlocks/hStack";
import VStack from "../../components/buildingBlocks/vStack";
import Image from "../../components/buildingBlocks/image";

import FormatDate from "~/lib/utils/formatDate";
import type { StorySummaryData } from "~/lib/db/user.server";
import type { StoryTemplate } from "@prisma/client";

interface StoryCardProps {
  story: StorySummaryData | StoryTemplate;
  bgColor: string;
  hideDate?: boolean;
}
export default function StoryCard({
  story,
  bgColor,
  hideDate = false,
}: StoryCardProps) {
  const navigate = useNavigate();
  const imagePath = story?.imageUrl;
  return (
    <Flex
      className={`w-full shadow-shadow3D ${bgColor} bg-darkVioletGrad ${borderShadow} hover:cursor-pointer story-card-hover  text-dv-100 font-normal hover:text-dv-100 ${cardWidths}`}
      onClick={() => navigate(`/story/char-select/${story.id}`)}
    >
      <HStack
        className={`w-full h-full shadow-shadow3D justify-between ${containerPadding}`}
      >
        <VStack align="start text-shadow-dvTextShadow text-[17px]" gap="gap-0">
          <Text className={`${cursiveText} ${headingSizes} `}>
            <i>{story.title}</i>
          </Text>
          <VStack
            className={`w-full leading-[15px] ${textSizes}`}
            align="start"
          >
            {hideDate ? null : (
              <Text>{FormatDate(String(story.createdAt))}</Text>
            )}
            <Text noOfLines={2}>{story.summary}</Text>
          </VStack>
        </VStack>
        <Flex className="h-[100px] w-[100px] flex-shrink-0">
          <Image
            src={imagePath || "/images/placeholderImage.png"}
            alt={story.title}
            h="100%"
            w="100%"
          />
        </Flex>
      </HStack>
    </Flex>
  );
}
