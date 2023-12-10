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
        className={`${borderShadow} relative w-[375px] h-[585px] p-5 text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad text-[44px] font-cursive leading-[60px]`}
      >
        <DarkViolet name="1" b="-bottom-[2px]" r="right-2" w="w-[200px]" />
        <DarkViolet
          name="violetsRowTwo"
          b="bottom-0"
          l="left-4"
          w="w-[120px]"
        />
        <Text className="text-dv-400">You did it!</Text>
        <Text>
          Check your email, and follow the link to login and get started.{" "}
        </Text>
      </VStack>
    </Flex>
  );
}
