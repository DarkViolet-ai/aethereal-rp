// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import VStack from "../buildingBlocks/vStack";
import { IoIosClose } from "react-icons/io/index.js";
import Box from "../buildingBlocks/box";

interface IconDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function IconDrawer({
  className = "",
  style = {},
  isOpen,
  onClose,
  children,
  setDrawerOpen,
  ...props
}: IconDrawerProps) {
  // Animation variants for sliding in and out
  const variants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "100%",
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
            className="fixed inset-0 bg-dv-975 backdrop-blur-sm bg- z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Drawer */}
          <motion.div
            className={`fixed top-2 right-0 w-full sm:w-[400px] h-[50px] bg-white shadow-shadow3D z-50 ${className}`}
            style={style}
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
              <Box
                onClick={() => setDrawerOpen(false)}
                className="absolute top-1 right-1 border-2 border-dv-175"
              >
                <IoIosClose size="20px" />
              </Box>
            </VStack>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
