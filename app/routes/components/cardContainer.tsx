import Text from "~/components/buildingBlocks/text";
import Flex from "../../components/buildingBlocks/flex";
import VStack from "../../components/buildingBlocks/vStack";
import { cursiveText } from "~/css/styles";

export default function CardContainer({
  className = "",
  children,
  heading,
}: // overflowY = "overflow-y-hidden",
{
  children?: React.ReactNode;
  className?: string;
  heading?: string;
  // overflowY?: string;
}) {
  return (
    <Flex className={`w-full h-full justify-center p-3 ${className}`}>
      <VStack
        className={`h-fit w-full xl:h-auto sm:w-11/12 md:max-w-[700px] xxl:w-10/12 bg-dv-975 shadow-dvShadow`}
      >
        <Flex className="w-full h-[60px] justify-center items-center p-2 pb-1 flex-shrink-0 bg-dv-975 rounded-b-none">
          <Text className={`${cursiveText} text-[45px]`}>{heading}</Text>
        </Flex>
        {children}
      </VStack>
    </Flex>
  );
}
