import { useState } from "react";
import Box from "../buildingBlocks/box";
import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";
import Text from "../buildingBlocks/text";
import IconDrawer from "./iconNavDrawer";
import IconButton from "../buildingBlocks/iconButton";
import { MenuIcon } from "~/css/styles";

export default function TopNav() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <Flex className="flex flex-row justify-between items-center w-full h-[50px] bg-dv-925 rounded-none shadow-shadow3D px-2 relative flex-shrink-0">
      <Box className="h-[38px] w-[300px] sm:h-[48px] sm:w-[390px] absolute bottom-0 left-2">
        <Image src="/images/core/aetherealLogo.png" alt="main logo" />
      </Box>
      <Text className="text-transparent">.</Text>
      <IconButton
        label="menu"
        icon={MenuIcon}
        onClick={() => setDrawerOpen(true)}
        tooltipPlacement="bottomLeft"
      />
      <IconDrawer
        setDrawerOpen={setDrawerOpen}
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Flex>
  );
}
