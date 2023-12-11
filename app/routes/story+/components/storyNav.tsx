import { NavLink } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";

export default function StoryNav() {
  return (
    <Flex className="flex-col lg:flex-row gap-4 pt-[50px]">
      <NavLink to="/">Test</NavLink>
      <Text>O</Text>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
    </Flex>
  );
}
