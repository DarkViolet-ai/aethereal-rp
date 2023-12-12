import { useNavigate } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { borderShadow, cursiveText } from "~/css/styles";

export default function NewStoryCard() {
  const navigate = useNavigate();

  return (
    <Flex
      className={`w-full max-w-[550px] bg-cyanGrad ${borderShadow} hover:cursor-pointer shadow-[0_20px_30px_rgba(8,_112,_184,_0.7)]`}
      onClick={() => navigate(`/story/new`)}
    >
      <HStack className="w-full h-full p-2 shadow-shadow3D justify-between">
        <VStack
          align="start h-full text-shadow-dvTextShadow text-[17px]"
          gap="gap-5"
        >
          <Flex className="pt-3">
            <Text
              className={`${cursiveText} text-shadow-textGlow text-dv-900 text-[45px]`}
            >
              <i>Create a New Story!</i>
            </Text>
          </Flex>

          <Text noOfLines={2}>Start your own new and exciting story!</Text>
        </VStack>
        <Flex className="h-[100px] w-[100px] flex-shrink-0">
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
