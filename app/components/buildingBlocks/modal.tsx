// FramerMotionModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";
import { CloseButton } from "./closeButton";

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
            className={`w-full max-w-[1300px] fixed inset-0 m-auto shadow-shadow3D z-50 md:w-98% md:h-98% ${className}`}
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
                <Flex className="flex-1 bg-cyanBack border-l-3 border-dv-900">
                  {children}
                </Flex>
                <Flex className="w-full bg-darkGrayBack rounded-t-none border-t-2 border-dv-850 justify-center flex-shrink-0 absolute bottom-0 left-0">
                  <CloseTextButton onClose={() => setModalOpen(false)} />
                </Flex>
              </Flex>
            </Flex>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
