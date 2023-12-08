import type { MetaFunction } from "@remix-run/node";
import StoryCharacters from "~/components/specialty/storiesCharacters";
import TopNav from "~/components/specialty/topNav";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <TopNav />

      <StoryCharacters />
    </>
  );
}
