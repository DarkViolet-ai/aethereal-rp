import type { StoryCharacter } from "~/lib/db/character.server";
import Flex from "../buildingBlocks/flex";

export default function UserOrAI({ character }: { character: StoryCharacter }) {
  const isUserStyles =
    "bg-lilac text-dv-900 border-2 font-semibold border-dv-900 px-[0.5vh] pb-[0.4vh] text-sm leading-none";
  const isAIStyles =
    "bg-dv-900 text-lilac border-2 font-semibold border-dv-400 px-[0.5vh] pb-[0.4vh] text-sm leading-none";
  const rolePlayerName = character.rolePlayer?.name || "AI";
  const useStyles = character.rolePlayer ? isUserStyles : isAIStyles;
  return (
    <>
      <Flex
        className={`${useStyles} shadow-dvShadow absolute top-2 right-2 quadHD:top-3 quadHD:right-3`}
      >
        {rolePlayerName}
      </Flex>
    </>
  );
}
