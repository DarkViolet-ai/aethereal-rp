import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import { borderShadow } from "~/css/styles";

export default function SignUpSuccess() {
  return (
    <Flex className="w-full h-full justify-center items-center">
      <VStack
        gap="gap-3"
        className={`${borderShadow} relative w-[375px] h-[585px] p-3 text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad `}
      >
        <DarkViolet b="-bottom-[2px]" l="left-2" w="w-[125px]" />
        <DarkViolet
          name="violetsRowSmall"
          b="bottom-0"
          r="right-4"
          w="w-[150px]"
        />
        <Text className="text-[44px] font-cursive">You did it!</Text>
      </VStack>
    </Flex>
  );
}
