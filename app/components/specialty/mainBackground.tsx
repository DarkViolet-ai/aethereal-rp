import React from "react";
import Flex from "../buildingBlocks/flex";

export default function MainBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex className="fixed h-screen w-full z-[-2] rounded-none">
      {children}
    </Flex>
  );
}
