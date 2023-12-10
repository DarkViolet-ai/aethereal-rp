import Text from "~/components/buildingBlocks/text";
import Flex from "../../components/buildingBlocks/flex";
import VStack from "../../components/buildingBlocks/vStack";
import { cursiveText } from "~/css/styles";
import HStack from "~/components/buildingBlocks/hStack";
import { NavLink } from "@remix-run/react";

export default function CardContainer({
  className = "",
  children,
  heading,
  id = "",
}: // overflowY = "overflow-y-hidden",
{
  children?: React.ReactNode;
  className?: string;
  heading?: string;
  id?: string;
  // overflowY?: string;
}) {
  function MobileHeading() {
    const MobileInactiveTab = `${cursiveText} text-[45px]`;
    const MobileActiveTab = "text-brightPink";

    return (
      <HStack className="w-full h-full justify-evenly items-center">
        <NavLink
          to="#stories"
          className={({ isActive }) =>
            isActive
              ? `${MobileInactiveTab} ${MobileActiveTab} `
              : MobileInactiveTab
          }
        >
          <Text>My Stories</Text>
        </NavLink>
        <NavLink
          to="#openings"
          className={({ isActive }) =>
            isActive ? `${MobileInactiveTab}` : MobileInactiveTab
          }
        >
          <Text>Openings</Text>
        </NavLink>
      </HStack>
    );
  }
  return (
    <Flex className={`w-full h-full justify-center p-3 ${className}`} id={id}>
      <VStack
        className={`h-fit w-full xl:h-auto sm:w-11/12 md:max-w-[700px] xxl:w-10/12 bg-dv-975 shadow-dvShadow`}
      >
        <Flex className="w-full h-[60px] justify-center items-center p-2 pb-1 flex-shrink-0 bg-dv-975 rounded-b-none shadow-shadow3D">
          <Flex className="w-full h-full justify-center items-center flex xl:hidden">
            <MobileHeading />
          </Flex>
          <Flex className="w-full h-full justify-center items-center hidden xl:flex">
            <Text className={`${cursiveText} text-[45px]`}>{heading}</Text>
          </Flex>
        </Flex>
        {children}
      </VStack>
    </Flex>
  );
}
