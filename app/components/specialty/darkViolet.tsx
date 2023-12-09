import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";

interface DarkVioletProps {
  className?: string;
  w?: string;
  h?: string;
  pos?: string;
  t?: string;
  l?: string;
  b?: string;
  r?: string;
  name?: string;
}

export default function DarkViolet({
  className = "",
  w,
  h,
  pos = "absolute",
  t,
  l,
  b,
  r,
  name = "main",
}: DarkVioletProps) {
  return (
    <Flex className={`${pos} ${t} ${l} ${b} ${r} ${h} ${w} ${className}`}>
      <Image
        src={`/images/core/DV${name}.png`}
        alt="Dark Violet"
        className={className}
      />
    </Flex>
  );
}
