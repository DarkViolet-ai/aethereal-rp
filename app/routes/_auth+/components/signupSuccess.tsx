import Flex from "~/components/buildingBlocks/flex";
import { HeadingXL, Text4XL } from "~/components/buildingBlocks/textComponents";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import { borderShadow, topNavPadding } from "~/css/styles";

export default function SignUpSuccess() {
  return (
    <Flex
      className={`w-full h-full justify-center md:items-center ${topNavPadding}`}
    >
      <VStack
        gap="gap-3"
        className={`${borderShadow} mt-[20px] md:mt-[0px] relative w-[375px] h-[585px] fullHD:h-70% fullHD:w-[600px] p-5 fullHD:p-[70px] quadHD:w-[800px] quadHD:h-60% quadHD:p-[150px] text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad font-cursive `}
      >
        <DarkViolet
          name="1"
          b="-bottom-[2px]"
          r="right-2"
          w="w-[200px] fullHD:w-[250px] quadHD:w-[300px] ultraHD:w-[400px]"
        />
        <DarkViolet
          name="violetsRowTwo"
          b="bottom-0"
          l="left-4"
          w="w-[120px] fullHD:w-[170px] quadHD:w-[200px]"
        />
        <HeadingXL shadow="text-shadow-textFog">You did it!</HeadingXL>
        <Text4XL>
          Check your email, and follow the link to login and get started.{" "}
        </Text4XL>
      </VStack>
    </Flex>
  );
}
