// FramerMotionModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";
import { CloseButton } from "./closeButton";
import Box from "./box";
import { borderShadow } from "~/css/styles";
import Portal from "./portal";
import IconButton from "./iconButton";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  // isOpen: boolean;
  // setModalOpen: (isOpen: boolean) => void;
  // onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: string;
  icon?: JSX.Element;
  label?: string;
}

export default function ModalWithButton({
  className = "",
  style = {},
  // isOpen,
  // onClose,
  // setModalOpen,
  icon: Icon,
  label,
  children,
  maxWidth = "max-w-[1300px]",
  ...props
}: ModalProps) {
  const [isModalOpen, setModalOpen] = useState(false);
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
        setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setModalOpen]);

  return (
    <>
      {" "}
      {Icon && label && (
        <IconButton
          icon={Icon}
          alt={label}
          label={label}
          onClick={() => setModalOpen(true)}
        />
      )}
      <Portal>
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 w-screen h-screen bg-dv-975 backdrop-blur-sm z-60"
                onClick={() => setModalOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Modal */}
              <motion.div
                className={`w-full h-full ${maxWidth} fixed inset-0 m-auto shadow-shadow3D z-50 lg:w-94% lg:h-94% ${className}`}
                style={{ ...style }}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                {...(props as any)}
              >
                <Flex className="w-full h-full relative ">
                  <CloseButton onClose={() => setModalOpen(false)} />

                  <Flex className="w-full h-full justify-between bg-cyanBack border-l-3 border-dv-900">
                    <Flex className="h-full w-full flex-1 bg-cyanBack border-l-3 border-dv-900 ">
                      <Box className="w-full h-full pb-[50px] rounded-b-none">
                        <Box
                          className={`w-full h-full shadow-shadow3D text-shadow-dvTextShadow rounded-b-none bg-darkVioletGrad ${borderShadow} overflow-y-auto`}
                        >
                          <Flex className="w-full h-full flex-col items-center rounded-b-none gap-5">
                            {children}
                          </Flex>
                        </Box>
                      </Box>
                    </Flex>
                    <Flex className="w-full h-[50px] bg-darkGrayBack rounded-t-none border-t-2 border-dv-850 justify-center flex-shrink-0 absolute bottom-0 left-0">
                      <CloseTextButton onClose={() => setModalOpen(false)} />
                    </Flex>
                  </Flex>
                </Flex>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
