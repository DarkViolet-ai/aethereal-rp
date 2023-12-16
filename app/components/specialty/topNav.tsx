import Box from "../buildingBlocks/box";
import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";
import { useNavigate, useParams } from "@remix-run/react";
import Drawer from "../buildingBlocks/drawer";
import { MdOutlineGroups2 } from "react-icons/md/index.js";
import CharactersMenu from "~/routes/story+/components/characterMenu";
import { useTypedRouteLoaderData } from "remix-typedjson";
import { StoryLoaderData } from "~/routes/story+/$storyId.$characterId";

export default function TopNav() {
  const navigate = useNavigate();
  const params = useParams();
  const storyLoaderData = useTypedRouteLoaderData<StoryLoaderData>(
    "routes/story+/$storyId.$characterId"
  );
  const isStory = params.characterId !== undefined;
  const characters = isStory && storyLoaderData?.story?.characters;
  // console.log(characters);

  return (
    <Flex className="fixed top-0 left-0 flex-row justify-between items-center w-full h-[50px] quadHD:h-[75px] ultraHD:h-[150px] bg-dv-990 rounded-none shadow-shadow3D px-2 flex-shrink-0 z-50">
      <Box
        className="h-[38px] w-[302px] sm:h-[48px] sm:w-[381px] quadHD:h-[65px] quadHD:w-[516px] ultraHD:h-[130px] ultraHD:w-[1032px] absolute bottom-0 left-2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Image src="/images/core/aetherealLogo.png" alt="main logo" />
      </Box>
      {isStory && (
        <Drawer
          icon={MdOutlineGroups2}
          label="characters"
          buttonPos="absolute"
          buttonT="top-2 quadHD:top-4 ultraHD:top-8"
          buttonR="right-2 quadHD:right-4 ultraHD:right-8"
          slideDirection="top-right"
          drawerWidth="w-full md:w-[60vw] lg:w-[40vw] quadHD:w-[30vw]"
          drawerHeight="h-full"
          buttonTooltipPlacement="bottomLeft"
          overlayBlur="backdrop-blur-none"
        >
          <CharactersMenu characters={characters || []} />
        </Drawer>
      )}
    </Flex>
  );
}
