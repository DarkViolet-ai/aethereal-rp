import Box from "../buildingBlocks/box";
import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";
import { useLocation, useNavigate, useParams } from "@remix-run/react";
import Drawer from "../buildingBlocks/drawer";
import { MdOutlineGroups2 } from "react-icons/md/index.js";
import { TempCharacterList } from "~/css/styles";
import CharactersMenu from "~/routes/story+/components/characterMenu";

export default function TopNav() {
  const navigate = useNavigate();
  const params = useParams();
  const isStory = params.characterId !== undefined;
  const characters = isStory && TempCharacterList.slice(0, 5);
  // console.log(characters);

  return (
    <Flex className="fixed top-0 left-0 flex-row justify-between items-center w-full h-[50px] quadHD:h-[75px] ultraHD:h-[100px] bg-dv-990 rounded-none shadow-shadow3D px-2 flex-shrink-0 z-50">
      <Box
        className="h-[38px] w-[300px] sm:h-[48px] quadHD:h-[65px] ultraHD:h-[90px] sm:w-[390px] fullHD:w-fit absolute bottom-0 left-2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Image src="/images/core/aetherealLogo.png" alt="main logo" />
      </Box>
      {isStory && (
        <Drawer
          icon={<MdOutlineGroups2 />}
          label="characters"
          buttonPos="absolute"
          buttonT="top-2"
          buttonR="right-2"
          slideDirection="top-right"
          drawerWidth="w-full max-w-[600px]"
          drawerHeight="h-full"
          buttonTooltipPlacement="bottomLeft"
          overlayBlur="backdrop-blur-none"
        >
          <CharactersMenu characters={characters} />
        </Drawer>
      )}
    </Flex>
  );
}
