import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text, { HeadingXL } from "~/components/buildingBlocks/textComponents";
import VStack from "~/components/buildingBlocks/vStack";
import { cardWidths, textSizes } from "~/css/styles";

export default function NewStoryCard({
  newTemplate = false,
}: {
  newTemplate?: boolean;
}) {
  return (
    <Flex
      className={`w-full p-2 md:p-3 xl:p-4 quadHD:p-5 ultraHD:p-8 bg-dv-900 border-2 border-dv-400 rounded-xl shadow-dvShadow hover:cursor-pointer ${textSizes} story-card-hover ${cardWidths}`}
    >
      <HStack className="w-full h-full justify-evenly">
        <VStack
          className="w-75% h-full text-shadow-dvTextShadow"
          align="start"
          gap="gap-3"
        >
          <Flex className="p-4">
            {newTemplate ? (
              <HeadingXL>
                Click here to start from scratch, or choose a template below.
              </HeadingXL>
            ) : (
              <HeadingXL>Create a New Story!</HeadingXL>
            )}
          </Flex>

          {newTemplate ? null : (
            <Text noOfLines={2} className="text-dv-100 hover:text-dv-100" >
              Start something new and exciting...or new and chill!
            </Text>
          )}
        </VStack>
        <Flex className="h-full w-25% justify-center itmes-center">
          <Flex className="w-full h-auto flex-shrink-0 shadow-dvShadow">
            <Image
              src="/images/stories/create_a_new_story.png"
              alt="create a new story"
              h="100%"
              w="100%"
            />
          </Flex>
        </Flex>
      </HStack>
    </Flex>
  );
}
