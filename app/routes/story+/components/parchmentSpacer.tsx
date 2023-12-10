import Flex from "~/components/buildingBlocks/flex";

interface ParchmentSpacerProps {
  placement?: "top" | "bottom";
}

export default function ParchmentSpacer({
  placement = "top",
}: ParchmentSpacerProps) {
  return (
    <>
      {" "}
      {placement === "top" ? (
        <Flex className="w-full h-[40px] min-h-[40px] flex-shrink-0 text-transparent  bg-parchmentSpacerTop absolute top-0 left-0">
          .
        </Flex>
      ) : (
        <Flex className="w-full h-[40px] min-h-[40px] flex-shrink-0 text-transparent bg-parchmentSpacerBottom absolute bottom-0 left-0">
          .
        </Flex>
      )}
    </>
  );
}
