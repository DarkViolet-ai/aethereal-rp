import { borderShadow, cardWidths, containerPadding } from "~/css/styles";
import Flex from "../../components/buildingBlocks/flex";
import Text, {
  HeadingLG,
  HeadingSM,
} from "../../components/buildingBlocks/textComponents";
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
      className={`w-full shadow-shadow3D ${bgColor} bg-darkVioletGrad ${borderShadow} hover:cursor-pointer story-card-hover  text-dv-100 font-normal hover:text-dv-100 ${cardWidths}`}
      onClick={() => navigate(`/story/char-select/${story.id}`)}
    >
      <HStack className={`w-full h-full justify-between ${containerPadding}`}>
        <VStack
          align="start text-shadow-dvTextShadow w-75% h-full justify-evenly"
          gap="gap-0"
        >
          <Flex className="w-full hidden lg:flex">
            <HeadingLG shadow={`text-shadow-textFog`}>
              <i>{story.title}</i>
            </HeadingLG>
          </Flex>
          <Flex className="w-full flex lg:hidden">
            <HeadingSM>
              <i>{story.title}</i>
            </HeadingSM>
          </Flex>
          {hideDate ? null : <Text>{FormatDate(String(story.createdAt))}</Text>}

          <Text noOfLines={2}>{story.summary}</Text>
        </VStack>
        <Flex className="h-full w-25% justify-center itmes-center flex-shrink-0">
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
