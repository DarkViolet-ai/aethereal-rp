import type { StoryCharacter } from "~/lib/db/character.server";
import Flex from "../buildingBlocks/flex";

export default function UserOrAI({ character }: { character: StoryCharacter }) {
  const isUserStyles =
    "bg-dv-400 text-dv-900 border-2 border-dv-900 px-[0.5vh] pb-[0.4vh] text-sm leading-none";
  const isAIStyles =
    "bg-dv-900 text-dv-400 border-2 border-dv-400 px-[0.5vh] pb-[0.4vh] text-sm leading-none";
  const rolePlayerName = character.rolePlayer?.name || "AI";
  const useStyles = character.rolePlayer ? isUserStyles : isAIStyles;
  return (
    <>
      <Flex className={`${useStyles} shadow-dvShadow`}>{rolePlayerName}</Flex>
    </>
  );
}
