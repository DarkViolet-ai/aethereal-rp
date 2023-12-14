import { useNavigate } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import {
  borderShadow,
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
      className={`w-full p-6 shadow-shadow3D bg-dv-700 ${borderShadow} hover:cursor-pointer ${textSizes} story-card-hover`}
    >
      <HStack className="w-full h-full justify-between">
        <VStack
          className="w-72% h-full text-shadow-dvTextShadow"
          align="start"
          gap="gap-5"
        >
          <Flex className="p-4">
            {newTemplate ? (
              <Text className={`${cursiveText}  ${headingSizes}}`}>
                Click here to start from scratch, or choose a template below.
              </Text>
            ) : (
              <Text
                className={`${cursiveText} text-shadow-boldTextGlow text-dv-900 text-[45px] leading-[47px]`}
              >
                Create a New Story!
              </Text>
            )}
          </Flex>

          {newTemplate ? null : (
            <Text noOfLines={2}>
              Start something new and exciting...or new and chill!
            </Text>
          )}
        </VStack>
        <Flex className="w-26% flex-shrink-0">
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
