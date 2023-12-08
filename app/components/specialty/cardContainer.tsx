import Flex from "../buildingBlocks/flex";
import VStack from "../buildingBlocks/vStack";

export default function CardContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Flex className=" w-[full] lg:w-1/2 justify-center p-3">
      <VStack className="bg-dv-450 shadow-dvShadow w-full p-2">
        {children}
      </VStack>
    </Flex>
  );
}
