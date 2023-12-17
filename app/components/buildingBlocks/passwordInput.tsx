import { useState } from "react";
import Input from "./input";
import HStack from "./hStack";
import Box from "./box";
import IconButton from "./iconButton";
import { FaEye, FaEyeSlash } from "react-icons/fa/index.js";
import VStack from "./vStack";
import { HeadingMD } from "./textComponents";

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
    <VStack gap="gap-0" align="start" className={`w-full`}>
      {confirm ? (
        <HeadingMD shadow="text-shadow-textFog">Confirm Password</HeadingMD>
      ) : (
        <HeadingMD shadow="text-shadow-textFog">Password</HeadingMD>
      )}
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
        <Box className="absolute right-[5px] top-1 md:top-[3px] fullHD:right-[10px] quadHD:top-[3px] ultraHD:top-[1px] ultraHD:right-[15px]">
          <IconButton
            pos="inherit"
            className="h-[25px] w-[25px] md:h-[20px] md:w-[20px] fullHD:h-[30px] fullHD:w-[30px] quadHD:h-[25px] quadHD:w-[25px] ultraHD:h-[45px] ultraHD:w-[45px]"
            iconSize="text-[17px] md:text-[15px] fullHD:text-[20px] ultraHD:text-[25px]"
            label="show/hide"
            icon={show ? FaEyeSlash : FaEye}
            onClick={handleClick}
          />
        </Box>
      </HStack>
    </VStack>
  );
}
