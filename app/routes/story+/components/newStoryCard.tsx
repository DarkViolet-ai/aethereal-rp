import { useNavigate } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { borderShadow, cursiveText, textSizes } from "~/css/styles";

export default function NewStoryCard({
  newTemplate = false,
}: {
  newTemplate?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <Flex
      className={`w-full shadow-slate-500 bg-cyanGrad ${borderShadow} hover:cursor-pointer ${textSizes} story-card-hover`}
      onClick={() => navigate(`/story/new`)}
    >
      <HStack className="w-full h-full p-2 shadow-shadow3D justify-between">
        <VStack
          align="start h-full text-shadow-dvTextShadow text-[17px]"
          gap="gap-5"
        >
          <Flex className="pt-3">
            {newTemplate ? (
              <Text
                className={`${cursiveText} text-shadow-boldTextGlow text-dv-900 text-[33px] leading-[35px] xxxl:text-[45px] xxxl:leading-[48px]`}
              >
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
        <Flex className="h-98% w-[100px] flex-shrink-0">
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
