import React from "react";
import { useDetectMobile } from "~/lib/hooks/useDetectMobile";

interface EntirePageContainerProps {
  children?: React.ReactNode;
  overflowY?: "hidden" | "scroll" | "auto";
  overflowX?: "hidden" | "scroll" | "auto";
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export default function EntirePageContainer({
  children,
  overflowX = "hidden",
  overflowY = "hidden",
  className,
  ref,
}: EntirePageContainerProps) {
  const isMobile = useDetectMobile();

  return (
    <div
      className={`flex flex-col items-center w-[100vw] ${
        isMobile ? "h-[87vh]" : "h-[100vh]"
      } ${
        isMobile ? "pb-[13vh]" : "pb-0"
      } overflow-x-${overflowX} overflow-y-${overflowY} ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
