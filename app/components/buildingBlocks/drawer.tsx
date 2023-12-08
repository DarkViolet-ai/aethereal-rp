// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import VStack from "./vStack";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Drawer({
  className = "",
  style = {},
  isOpen,
  onClose,
  children,
  setDrawerOpen,
  ...props
}: DrawerProps) {
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Drawer */}
          <motion.div
            className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-dvShadow z-50 ${className}`}
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
              <Flex className="w-full bg-darkGrayBack rounded-t-none border-t-2 border-dv-850 justify-center">
                <CloseTextButton onClose={() => setDrawerOpen(false)} />
              </Flex>
            </VStack>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
