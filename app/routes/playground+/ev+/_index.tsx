import Box from "~/components/buildingBlocks/box";
import Center from "~/components/buildingBlocks/center";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import VStack from "~/components/buildingBlocks/vStack";

export default function PlaygrounIndex() {
  return (
    <Center className="w-full h-full overflow-y-auto pt-[100px]">
      <VStack align="start">
        <Box className="p-4 bg-white text-black w-[50vw] rounded-none">
          [50vw]
        </Box>
        <Box className="p-4 bg-white text-black w-[51vw] rounded-none">
          [51vw]
        </Box>
        <Box className="p-4 bg-white text-black w-[51.3vw] rounded-none">
          [51.3vw]
        </Box>
        <Box className="p-4 bg-white text-black w-[51.4vw] rounded-none">
          [51.4vw]
        </Box>
        <Box className="p-4 bg-white text-black w-[51.5vw] rounded-none">
          [51.5vw]
        </Box>
        <Flex className="w-full bg-black gap-1">
          <Box className="p-4 bg-white text-black w-[25%] rounded-none">
            [25%]
          </Box>{" "}
          <Box className="p-4 bg-white text-black w-[15%] rounded-none">
            [15%]
          </Box>
          <Box className="p-4 bg-white text-black w-[30%] rounded-none">
            [30%]
          </Box>
        </Flex>
        <Box className="p-4 bg-white text-black w-[50%] rounded-none">
          [50%]
        </Box>
        <Box className="p-4 bg-white text-black w-[55%] rounded-none">
          [55%]
        </Box>
        <Box className="p-4 bg-white text-black w-[55.5%] rounded-none">
          [55.5%]
        </Box>
        <Box className="p-4 bg-white text-black w-55% rounded-none">55%</Box>
        <Box className="p-4 bg-white text-black w-55vw rounded-none">55%</Box>
        <Box className="p-4 bg-white text-black w-20vw rounded-none">20vw</Box>
        <HStack className="w-full gap-1">
          {" "}
          <Box className="p-4 bg-white text-black w-20% rounded-none">20%</Box>
          <Box className="p-4 bg-white text-black w-20% rounded-none">20%</Box>
          <Box className="p-4 bg-white text-black w-20% rounded-none">20%</Box>
          <Box className="p-4 bg-white text-black w-20% rounded-none">20%</Box>
          <Box className="p-4 bg-white text-black w-20% rounded-none">20%</Box>
        </HStack>
      </VStack>
    </Center>
  );
}
