import Flex from "./flex";
import Text from "./text";
import VStack from "./vStack";

export default function OneToTwoColumnPage() {
  const colMaxWidths =
    "w-full md:w-80% lg:w-full xxl:w-90% xxxl:w-80% justify-center";
  const cardWidths = "w-98% sm:w-92% md:w-90% lg:w-98% xl:w-90% xxl:w-88%";
  //   const textSizes =
  //     "text-[18px] leading-[22px] md:text-[20px] md:leading-[26px] lg:text-[18px] lg:leading-[22px] xl:text-[20px] xl:leading-[24px] xxl:text-[21px] xxl:leading-[25px] xxl:text-[23px] leading-[27px]";
  //   const titleSizes =
  //     "text-[33px] md:text-[40px] lg:text-[42px] xl:text-[44px] xxl:text-[46px] xxxl:text-[50px]";
  //   const headingSizes =
  //     "text-[40px] xl:text-[42px] xxl:text-[44px] xxxl:text-[46px]";
  return (
    <Flex className="h-full w-full pt-50px justify-center overflow-y-hidden">
      <Flex
        className={`w-full h-full flex-col lg:flex-row items-center lg:items-start overflow-y-auto lg:overflow-y-hidden gap-[40px] lg:gap-[10px] py-5`}
      >
        <Flex className={`w-full ${colMaxWidths} h-fit lg:h-full`}>
          <Flex className="w-full h-fit min-h-full lg:h-full justify-center">
            {" "}
            <VStack className={`${cardWidths} bg-dv-700 h-fit lg:h-full`}>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
            </VStack>
          </Flex>
        </Flex>
        <Flex className={`w-full ${colMaxWidths} h-fit lg:h-full `}>
          <Flex className="w-full h-fit min-h-full lg:h-full justify-center">
            {" "}
            <VStack className={`${cardWidths} bg-dv-700 h-fit lg:h-full`}>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
            </VStack>
          </Flex>
        </Flex>
      </Flex>{" "}
    </Flex>
  );
}
