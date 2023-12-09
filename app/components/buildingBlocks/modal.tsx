// FramerMotionModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import VStack from "./vStack";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  className = "",
  style = {},
  isOpen,
  onClose,
  children,
  setModalOpen,
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 w-screen h-screen bg-dv-975 backdrop-blur-sm z-60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal */}
          <motion.div
            className={`w-full h-full md:w-11/12 md:h-11/12 xxl:w-10/12 xxl:h-10/12 fixed inset-0 m-auto shadow-dvShadow z-50 ${className}`}
            style={{ maxWidth: "95vw", maxHeight: "95vh", ...style }}
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            {...(props as any)}
          >
            <VStack
              className="w-full h-full justify-between relative bg-cyanBack border-l-3 border-dv-900"
              gap="gap-0"
            >
              {children}
              <Flex className="w-full bg-darkGrayBack rounded-t-none border-t-2 border-dv-850 justify-center">
                <CloseTextButton onClose={() => setModalOpen(false)} />
              </Flex>
            </VStack>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
