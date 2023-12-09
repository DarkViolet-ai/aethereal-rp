import React from "react";
import Flex from "./flex";

interface EntirePageContainerProps {
  children?: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export default function EntirePageContainer({
  children,
  className,
  ref,
}: EntirePageContainerProps) {
  return (
    <Flex
      className="w-full bg-calmVioletCyanGrad rounded-none pb-[35px]"
      style={{ height: "100svh" }}
    >
      {children}
    </Flex>
  );
}
