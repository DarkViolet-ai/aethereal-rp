import Flex from "../../components/buildingBlocks/flex";
import VStack from "../../components/buildingBlocks/vStack";

export default function CardContainer({
  className = "",
  children,
  overflowY = "overflow-y-hidden",
}: {
  children?: React.ReactNode;
  className?: string;
  overflowY?: string;
}) {
  return (
    <Flex className={`w-full h-full   justify-center p-3 ${className}`}>
      <VStack
        className={`w-full min-w-[375px] sm:w-11/12 sm:min-w-[500px] md:w-fit md:min-w-[550px] xxl:w-10/12 bg-dv-975 shadow-dvShadow p-2 ${overflowY}`}
      >
        {children}
      </VStack>
    </Flex>
  );
}
