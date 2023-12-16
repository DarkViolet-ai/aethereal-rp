import Box from "~/components/buildingBlocks/box";
import Image from "~/components/buildingBlocks/image";

interface ParchmentCornerProps {
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export default function ParchmentCorner({
  corner = "bottom-right",
  className = "",
}: ParchmentCornerProps) {
  const getPositionClasses = (
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    switch (corner) {
      case "top-left":
        return "top-[-10px] left-[-10px] sm:top-[-15px] sm:left-[-15px] md:top-[-20px] md:left-[-20px] rotate-180";
      case "top-right":
        return "top-[-10px] right-[-10px] sm:top-[-15px] sm:right-[-15px] md:top-[-20px] md:right-[-20px] -rotate-90";
      case "bottom-left":
        return "bottom-[-10px] left-[-10px] sm:bottom-[-15px] sm:left-[-15px] md:bottom-[-20px] md:left-[-20px] rotate-90";
      case "bottom-right":
        return "bottom-[-10px] right-[-10px] sm:bottom-[-15px] sm:right-[-15px] md:bottom-[-20px] md:right-[-20px] rotate-0";
      default:
        return "";
    }
  };

  return (
    <Box className={`absolute z-30 ${getPositionClasses(corner)} ${className}`}>
      <Image
        src="/images/core/parchmentCorner.png"
        alt="parchment corner"
        className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] ultraHD:h-[300px] ultraHD:w-[300px]"
      />
    </Box>
  );
}
