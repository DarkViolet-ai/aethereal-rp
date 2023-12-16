import React from "react";
import { motion } from "framer-motion";
import {
  defaultOverlayBlur,
  defaultOverlayColor,
  negativeStyles,
} from "~/css/styles";
import DarkViolet from "../specialty/darkViolet";
import ImageIcon from "../specialty/imageIcon";
import Text, { Heading2XL } from "./textComponents";
import Button from "./button";
import HStack from "./hStack";
import Flex from "./flex";
import VStack from "./vStack";

const sizeClasses = {
  xs: "w-full h-1/3 md:w-64 md:h-1/2",
  sm: "w-full h-1/2 md:w-96 md:h-1/2",
  md: "w-full h-1/2 md:w-1/3 md:h-1/2",
  lg: "w-full h-2/3 md:w-1/2 md:h-2/3",
  xl: "w-full h-5/6 md:w-2/3 md:h-2/3",
  full: "w-full h-full",
};

interface AlertProps {
  isAlertOpen: boolean;
  onClose: () => void;
  onConfirmClick: () => void;
  cancelRef: React.MutableRefObject<HTMLButtonElement | null>;
  title: string;
  body: string;
  confirmButtonText: string;
  cancelButtonText: string;
  imageIcon?: string;
  size?: keyof typeof sizeClasses;
  imageWidth?: string;
  bodyWidth?: string;
  bodyTextSize?: string;
}

export default function Alert({
  isAlertOpen,
  onClose,
  onConfirmClick,
  cancelRef,
  title,
  body,
  confirmButtonText,
  cancelButtonText,
  imageIcon,
  size,
  imageWidth = "w-40%",
  bodyWidth = "w-60%",
  bodyTextSize = "text-xl",
}: AlertProps) {
  const sizeClass = size ? sizeClasses[size] || sizeClasses.md : sizeClasses.md;
  if (!isAlertOpen) return null;

  // Animation variants for Framer Motion
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.5 } },
  };

  const modalExitVariants = {
    exit: { y: "-100vh", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 overflow-auto ${defaultOverlayBlur} ${defaultOverlayColor} flex justify-center items-center`}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className={`bg-cyanBack rounded-lg shadow-dvShadow ${sizeClass}`}
        variants={{ ...modalVariants, ...modalExitVariants }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <VStack className="w-full h-full justify-between ">
          {/* Custom Image */}
          <DarkViolet name="9" w={imageWidth} b="bottom-0" l="left-2" />
          {/* Header */}
          <HStack className="w-full items-center bg-dv-975 rounded-b-none p-[1vh] gap-2 md:gap-[1vw]">
            {imageIcon && (
              <ImageIcon
                keyword={imageIcon}
                h="h-12 md:h-[3vw]"
                w="w-12 md:w-[3vw]"
              />
            )}
            <Heading2XL color="text-pinkest" shadow="text-shadow-textFog">
              {title}
            </Heading2XL>
          </HStack>
          {/* Body */}
          <Flex className="w-full justify-end p-[1vw]">
            <Flex className={`${bodyWidth} justify-end`}>
              <Text className={`${bodyTextSize} text-shadow-dvTextShadow`}>
                {body}
              </Text>
            </Flex>
          </Flex>
          {/* Footer */}
          <HStack className="w-full justify-end gap-[2vw] p-[1vh]">
            <Button ref={cancelRef} onClick={onClose} width="w-fit">
              {cancelButtonText}
            </Button>
            <Button
              onClick={onConfirmClick}
              width="w-fit"
              className={`${negativeStyles}`}
            >
              {confirmButtonText}
            </Button>
          </HStack>
        </VStack>
      </motion.div>
    </motion.div>
  );
}
