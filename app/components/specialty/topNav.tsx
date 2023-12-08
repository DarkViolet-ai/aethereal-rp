import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";

export default function TopNav() {
  return (
    <Flex className="flex flex-row justify-between items-center w-full h-[50px] bg-dv-950 rounded-none shadow-shadow3D px-2">
      <Image
        src="/core/aetherealLogo.png"
        className="w-[200px]"
        alt="main logo"
      />
    </Flex>
  );
}
