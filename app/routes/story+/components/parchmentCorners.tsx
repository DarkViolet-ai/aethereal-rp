import type { CSSProperties } from "react";
import Box from "~/components/buildingBlocks/box";
import Image from "~/components/buildingBlocks/image";

interface ParchmentCornerProps {
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export default function ParchmentCorner({
  corner = "bottom-right",
  className,
}: ParchmentCornerProps) {
  const parchmentCornerStyle: CSSProperties = {
    position: "absolute",
    width: "200px",
    height: "200px",
    zIndex: 1,
  };

  switch (corner) {
    case "top-left":
      parchmentCornerStyle.top = "-18px";
      parchmentCornerStyle.left = "-18px";
      parchmentCornerStyle.transform = "rotate(180deg)";
      break;
    case "top-right":
      parchmentCornerStyle.top = "-18px";
      parchmentCornerStyle.right = "-18px";
      parchmentCornerStyle.transform = "rotate(-90deg)";
      break;
    case "bottom-left":
      parchmentCornerStyle.bottom = "-18px";
      parchmentCornerStyle.left = "-18px";
      parchmentCornerStyle.transform = "rotate(90deg)";
      break;
    case "bottom-right":
      // Original image orientation, no rotation needed
      parchmentCornerStyle.bottom = "-18px";
      parchmentCornerStyle.right = "-18px";
      parchmentCornerStyle.transform = "rotate(0deg)";
      break;
  }

  return (
    <Box style={parchmentCornerStyle} className={className}>
      <Image src="/images/core/parchmentCorner.png" alt="parchment corner" />
    </Box>
  );
}
