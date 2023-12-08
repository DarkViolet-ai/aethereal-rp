import Flex from "../buildingBlocks/flex";
import VStack from "../buildingBlocks/vStack";

export default function CardContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Flex className=" w-full h-full lg:w-1/2 justify-center p-3">
      <VStack
        className="w-fit min-w-[375px] sm:min-w-[500px] md:min-w-[550px] bg-dv-450 shadow-dvShadow p-2 overflow-y-auto"
        style={{ height: "90vh" }}
      >
        {children}
      </VStack>
    </Flex>
  );
}
