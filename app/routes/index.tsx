import type { MetaFunction } from "@remix-run/node";
import Flex from "~/components/buildingBlocks/flex";
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
    <Flex className="w-full h-full">
      <StoryCharacters />
    </Flex>
  );
}
