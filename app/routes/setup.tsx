import Box from "~/components/buildingBlocks/box";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import VStack from "~/components/buildingBlocks/vStack";
import { borderShadow } from "~/css/styles";

export default function Setup() {
  return (
    <Flex className="w-full h-full justify-center pt-[50px] pb-[35px] items-center">
      <VStack className="w-full p-4" gap="gap-5">
        <Box className={`w-1/2 h-[400px] ${borderShadow} w-fit`}>
          <Box className="w-full h-[400px] bg-dv-800 shadow-shadow3D p-2 overflow-y-auto">
            <Text>TEXT</Text>
          </Box>
        </Box>
        <Box className="w-1/2">
          <TextAreaVStack label="Type Things Here" className="w-full h-full" />
        </Box>
      </VStack>
    </Flex>
  );
}
