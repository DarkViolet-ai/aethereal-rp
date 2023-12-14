import { useNavigate } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import {
  borderShadow,
  cardWidths,
  cursiveText,
  headingSizes,
  textSizes,
  titleSizes,
} from "~/css/styles";

export default function NewStoryCard({
  newTemplate = false,
}: {
  newTemplate?: boolean;
}) {
  return (
    <Flex
      className={`w-full p-2 md:p-3 xl:p-4 quadHD:p-5 ultraHD:p-8 bg-dv-900 border-2 border-dv-400 rounded-xl shadow-dvShadow hover:cursor-pointer ${textSizes} story-card-hover ${cardWidths}`}
    >
      <HStack className="w-full h-full justify-between">
        <VStack
          className="w-70% h-full text-shadow-dvTextShadow"
          align="start"
          gap="gap-3"
        >
          <Flex className="p-4">
            {newTemplate ? (
              <Text className={`${cursiveText}  ${headingSizes}`}>
                Click here to start from scratch, or choose a template below.
              </Text>
            ) : (
              <Text className={`${cursiveText}  ${titleSizes}`}>
                Create a New Story!
              </Text>
            )}
          </Flex>

          {newTemplate ? null : (
            <Text noOfLines={2} className="text-dv-100 hover:text-dv-100">
              Start something new and exciting...or new and chill!
            </Text>
          )}
        </VStack>
        <Flex className="w-40% flex-shrink-0">
          <Image
            src="/images/stories/create_a_new_story.png"
            alt="create a new story"
            h="100%"
            w="100%"
          />
        </Flex>
      </HStack>
    </Flex>
  );
}
