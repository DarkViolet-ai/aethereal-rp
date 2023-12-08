import type { MetaFunction } from "@remix-run/node";
import Text from "~/components/buildingBlocks/text";
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
      <Text>Index</Text>
    </>
  );
}
