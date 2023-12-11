import Box from "../buildingBlocks/box";
import HStack from "../buildingBlocks/hStack";
import Text from "../buildingBlocks/text";
import BouncingDots from "./bouncingDots";

export default function LoadingText({
  fontSize = "text-[35px]",
  lineHeight = "leading-2rem",
  fontFamily = "font-cursive",
  dotSize = 8,
  color = "font-dv-400",
  align = "items-end",
  gap = "gap-2",
  dotCount = 4,
}: {
  fontSize?: string;
  lineHeight?: string;
  fontFamily?: string;
  dotSize?: number;
  color?: string;
  align?: string;
  gap?: string;
  dotCount?: number;
}) {
  return (
    <HStack
      className={`${fontSize} ${lineHeight} ${fontFamily} ${color} ${align} textShadow-dvTextShadow ${gap}`}
    >
      <Text>Loading</Text>
      <Box className="mb-2">
        <BouncingDots dotSize={dotSize} dotCount={dotCount} />
      </Box>
    </HStack>
  );
}
