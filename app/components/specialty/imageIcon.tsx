import Box from "../buildingBlocks/box";
import Image from "../buildingBlocks/image";

interface ImageIconProps {
  keyword?: string;
  label?: string;
  onClick?: () => void;
  h?: string;
  w?: string;
  shadow?: string;
  rounded?: string;
  transform?: string;
  transition?: string;
  cursor?: string;
  zIndex?: string;
  pos?: "relative" | "absolute" | "fixed";
  t?: string;
  l?: string;
  r?: string;
  b?: string;
  imageIconPath?: string;
}

export default function ImageIcon({
  keyword,
  label,
  onClick,
  h = "h-[5vh]",
  w = "w-[5vh]",
  rounded = "rounded-lg",
  transform,
  transition,
  cursor = "arrow",
  zIndex,
  pos = "relative",
  t,
  l,
  r,
  b,
  imageIconPath,
}: ImageIconProps) {
  return (
    <Box
      className={`${rounded} ${pos} ${h} ${w} ${t} ${l} ${r} ${b} ${zIndex} hover:cursor-pointer`}
      onClick={onClick}
    >
      <Image
        className={`${rounded} shadow-dvShadow ${transform} ${transition} ${cursor}`}
        src={imageIconPath ? imageIconPath : `/images/icons/${keyword}Icon.png`}
        h="h-full"
        w="w-full"
        alt={`${keyword} image icon`}
      />
    </Box>
  );
}
