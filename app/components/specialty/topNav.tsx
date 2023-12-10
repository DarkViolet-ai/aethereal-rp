import Box from "../buildingBlocks/box";
import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";

import { useNavigate } from "@remix-run/react";

export default function TopNav() {
  const navigate = useNavigate();
  return (
    <Flex className="fixed top-0 left-0 z-49 flex-row justify-between items-center w-full h-[50px] bg-dv-990 rounded-none shadow-shadow3D px-2 flex-shrink-0">
      <Box
        className="h-[38px] w-[300px] sm:h-[48px] sm:w-[390px] absolute bottom-0 left-2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Image src="/images/core/aetherealLogo.png" alt="main logo" />
      </Box>
    </Flex>
  );
}
