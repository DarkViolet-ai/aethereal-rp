import type { MetaFunction } from "@remix-run/node";
import ResponsiveFlex from "~/components/buildingBlocks/responsiveFlex";
import StoryCharacters from "~/routes/components/storiesCharacters";

export const meta: MetaFunction = () => {
  return [
    { title: "Aethereal RP: Multiverses with Dark Violet" },
    {
      name: "AI and humans co-creating!",
      content: "Welcome to Aethereal RP!",
    },
  ];
};

export default function Index() {
  return (
    <ResponsiveFlex>
      <StoryCharacters />
    </ResponsiveFlex>
  );
}
