import {
  borderShadow,
  cursiveText,
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
import useSizedImage from "../hooks/useSizedImage";

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
  const id = (story as StorySummaryData).storyTemplateId || story.id;
  const imagePath = useSizedImage(id, "thumbnail");
  return (
    <Flex
      className={`w-full shadow-shadow3D ${bgColor} bg-darkVioletGrad ${borderShadow} hover:cursor-pointer story-card-hover  text-dv-100 font-normal hover:text-dv-100 ${cardWidths} py-3`}
      onClick={() => navigate(`/story/char-select/${story.id}`)}
    >
      <HStack className={`w-full h-full justify-between ${containerPadding}`}>
        <VStack
          align="start text-shadow-dvTextShadow w-70% h-full justify-between"
          gap="gap-0"
        >
          <Text
            className={`${cursiveText} ${headingSizes} text-shadow-textFog`}
          >
            <i>{story.title}</i>
          </Text>
          {hideDate ? null : <Text>{FormatDate(String(story.createdAt))}</Text>}

          <Text noOfLines={2} className={` ${textSizes}`}>
            {story.summary}
          </Text>
        </VStack>
        <Flex className="h-full w-30% justify-center itmes-center">
          <Flex className="w-full h-auto flex-shrink-0 shadow-dvShadow">
            <Image
              src={
                imagePath && imagePath.length > 1
                  ? imagePath
                  : "/images/placeholderImage.png"
              }
              alt={story.title}
              h="100%"
              w="100%"
            />
          </Flex>
        </Flex>
      </HStack>
    </Flex>
  );
}
