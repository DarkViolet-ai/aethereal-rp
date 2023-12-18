// FramerMotionModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";
import { CloseButton } from "./closeButton";
import Box from "./box";
import {
  borderShadow,
  defaultOverlayBlur,
  defaultOverlayColor,
} from "~/css/styles";
import Portal from "./portal";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  modalContentClassName?: string;
  modalOverlayClassName?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: string;
  showTopClose?: boolean;
  showBottomClose?: boolean;
  overlayBlur?: string;
  overlayColor?: string;
}

export default function Modal({
  modalContentClassName = "",
  modalOverlayClassName = "",
  style = {},
  isOpen,
  onClose,
  children,
  setModalOpen,
  showTopClose = true,
  showBottomClose = true,
  maxWidth,
  overlayBlur = defaultOverlayBlur,
  overlayColor = defaultOverlayColor,
  ...props
}: ModalProps) {
  // Animation variants for scaling in and out
  const variants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      scale: 0,
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // Handle escape key press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onClose]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={`fixed inset-0 w-screen h-screen ${overlayColor} ${overlayBlur} z-60 ${modalOverlayClassName}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onClose();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Modal */}
            <motion.div
              className={`w-full h-full ${maxWidth} fixed inset-0 m-auto shadow-shadow3D z-50 lg:w-94% lg:h-94% ${modalContentClassName} overflow-y-hidden`}
              style={{ ...style }}
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
              {...(props as any)}
            >
              <Flex className="w-full h-full relative overflow-y-hidden">
                {showTopClose && <CloseButton onClose={onClose} />}
                <Flex className="w-full h-full justify-between bg-cyanBack border-l-3 border-dv-900 overflow-y-hidden ">
                  <Flex className="h-full w-full flex-1 bg-cyanBack border-l-3 border-dv-900 overflow-y-hidden">
                    <Box className="w-full h-full pb-[50px] rounded-b-none overflow-y-hidden">
                      <Box
                        className={`w-full h-full shadow-shadow3D text-shadow-dvTextShadow rounded-b-none bg-darkVioletGrad ${borderShadow} overflow-y-hidden`}
                      >
                        <Flex className="w-full h-full flex-col items-center rounded-b-none gap-5  pb-[7vh]">
                          {children}
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                  {showBottomClose && (
                    <Flex className="w-full h-[7vh] items-center bg-darkGrayBack rounded-t-none border-t-2 border-dv-850 justify-center flex-shrink-0 absolute bottom-0 left-0">
                      <CloseTextButton onClose={onClose} />
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
