// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import VStack from "./vStack";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";
import IconButton from "./iconButton";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: JSX.Element;
  label?: string;
  drawerWidth?: string;
  drawerHeight?: string;
  // isOpen: boolean;
  // setDrawerOpen: (isOpen: boolean) => void;
  // onClose: () => void;
}

export default function Drawer({
  className = "",
  style = {},
  children,
  icon: Icon,
  label,
  drawerWidth = "w-[400px]",
  drawerHeight = "h-full",
  ...props
}: // isOpen,
// onClose,
// setDrawerOpen,

DrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
        setDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {Icon && label && (
            <IconButton
              icon={Icon}
              alt={label}
              label={label}
              onClick={() => setDrawerOpen(true)}
            />
          )}
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-dv-800 blur-sm z-40"
            onClick={() => setDrawerOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Drawer */}
          <motion.div
            className={`fixed top-0 right-0 ${drawerWidth} ${drawerHeight} shadow-dvShadow z-50 ${className}`}
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
