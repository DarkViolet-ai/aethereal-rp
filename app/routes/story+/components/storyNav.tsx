import { FaKeyboard } from "react-icons/fa/index.js";
import Flex from "~/components/buildingBlocks/flex";
import IconButton from "~/components/buildingBlocks/iconButton";

export default function StoryNav() {
  return (
    <Flex className="flex-col lg:flex-row gap-4">
      <IconButton alt="interaction" label="interact" icon={<FaKeyboard />} onClick={() => {}} />
    </Flex>
  );
}
