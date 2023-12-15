import { useState } from "react";
import Input from "./input";
import HStack from "./hStack";
import Box from "./box";
import IconButton from "./iconButton";
import { FaEye, FaEyeSlash } from "react-icons/fa/index.js";
import VStack from "./vStack";
import Text from "./textComponents";
import { headingSizes } from "~/css/styles";

interface PasswordInputProps {
  name?: string;
  id?: string;
  confirm?: boolean;
}

export default function PasswordInput({
  name = "password",
  id = "password",
  confirm = false,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack
      gap="gap-0"
      align="start"
      className={`w-full ${headingSizes} text-shadow-textFog`}
    >
      {confirm ? <Text>Confirm Password</Text> : <Text>Password</Text>}
      <HStack className="w-full relative" gap="gap-0">
        <Box className="relative w-full">
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            id={id}
            name={confirm ? "confirmPassword" : name}
            required
          />
        </Box>
        <Box className="absolute right-[5px] top-1 fullHD:right-[10px]">
          <IconButton
            className="h-[25px] w-[25px] fullHD:h-[30px] fullHD:w-[30px] ultraHD:h-[35px] ultraHD:w-[35px]"
            iconSize="text-[17px] md:text-[20px] fullHD:text-[25px] ultraHD:text-[30px]"
            label="show/hide"
            icon={show ? <FaEyeSlash /> : <FaEye />}
            onClick={handleClick}
          />
        </Box>
      </HStack>
    </VStack>
  );
}
