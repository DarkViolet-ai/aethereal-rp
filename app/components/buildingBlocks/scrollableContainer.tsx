import Flex from "./flex";

interface ScrollableContainerProps {
  w?: string;
  h?: string;
  children: React.ReactNode;
  direction?: "flex-col" | "flex-row";
  gap?: string;
  outerClassName?: string;
  scrollableClassName?: string;
}

export default function ScrollableContainer({
  w = "w-full",
  h = "h-full",
  children,
  direction = "flex-col",
  gap = "gap-[1vh]",
  outerClassName = "",
  scrollableClassName = "",
}: ScrollableContainerProps) {
  return (
    <Flex className={`p-[1vh] w-full h-full ${outerClassName}`}>
      <Flex
        className={`${w} ${h} ${direction} ${gap} overflow-y-auto ${scrollableClassName}`}
      >
        {children}
      </Flex>
    </Flex>
  );
}
