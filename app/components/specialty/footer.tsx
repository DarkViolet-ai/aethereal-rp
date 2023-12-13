import Flex from "../buildingBlocks/flex";

export default function Footer() {
  return (
    <Flex className="fixed bottom-0 left-0 z-45 flex-row justify-center items-center w-full h-[35px] fullHD:h-[50px] quadHD:h-[60px] ultraHD:h-[70px] bg-dv-990 rounded-none shadow-shadow3D px-2 flex-shrink-0">
      <Flex className="text-dv-100 text-[15px] fullHD:text-[27px] quadHD:text-[30px] ultraHD:text-[40px]">
        <span>© 2023 DarkViolet.ai</span>
      </Flex>
    </Flex>
  );
}
