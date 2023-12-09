import Flex from "../../components/buildingBlocks/flex";
import VStack from "../../components/buildingBlocks/vStack";

export default function CardContainer({
  children,
  overflowY = "overflow-y-auto",
}: {
  children?: React.ReactNode;
  overflowY?: string;
}) {
  return (
    <Flex className=" w-full h-full lg:w-1/2 justify-center p-3">
      <VStack
        className={`w-fit min-w-[375px] sm:min-w-[500px] md:min-w-[550px] bg-dv-450 shadow-dvShadow p-2 ${overflowY}`}
    
      >
        {children}
      </VStack>
    </Flex>
  );
}
