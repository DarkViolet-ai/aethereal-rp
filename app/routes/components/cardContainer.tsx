import Text, { HeadingXL } from "~/components/buildingBlocks/textComponents";
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
    const MobileInactiveStyle = `${cursiveText} text-[35px] sm:text-[45px] hover:text-brightPink hover:cursor-pointer`;
    const MobileActiveStyle = `${cursiveText} text-[40px] sm:text-[50px] text-dv-900 text-shadow-textGlow`;
    return (
      <>
        {heading === "My Stories" ? (
          <HStack className="w-full h-full justify-evenly items-center">
            <NavLink to="#stories">
              <Text className={`${MobileActiveStyle}`}>My Stories</Text>
            </NavLink>
            <NavLink to="#openings">
              <Text className={`${MobileInactiveStyle}`}>Openings</Text>
            </NavLink>
          </HStack>
        ) : (
          <HStack className="w-full h-full justify-evenly items-center">
            <NavLink to="#stories">
              <Text className={`${MobileInactiveStyle}`}>My Stories</Text>
            </NavLink>
            <NavLink to="#openings">
              <Text className={`${MobileActiveStyle}`}>Openings</Text>
            </NavLink>
          </HStack>
        )}
      </>
    );
  }

  return (
    <Flex className={`w-full h-full justify-center p-3 ${className}`} id={id}>
      <VStack
        className={`h-fit w-full lg:h-auto  bg-dv-975 shadow-dvShadow gap-0`}
      >
        <Flex className="w-full h-[70px] justify-center items-center p-2 pb-1 flex-shrink-0 bg-dv-975 rounded-b-none shadow-shadow3D">
          <Flex className="w-full h-full justify-center items-center flex lg:hidden">
            <MobileHeading />
          </Flex>
          <Flex className="w-full h-full justify-center items-center hidden lg:flex">
            <HeadingXL>{heading}</HeadingXL>
          </Flex>
        </Flex>
        {children}
      </VStack>
    </Flex>
  );
}
