// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import VStack from "../buildingBlocks/vStack";
import { IoIosClose } from "react-icons/io/index.js";
import Box from "../buildingBlocks/box";
import Portal from "../buildingBlocks/portal";
import Text from "../buildingBlocks/text";
// import { set } from "zod";

interface IconDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  // isOpen: boolean;
  // setDrawerOpen: (isOpen: boolean) => void;
  // onClose: () => void;
  children?: React.ReactNode;
}

export default function IconDrawer({
  className = "",
  style = { zIndex: "200" },
  // isOpen,
  // onClose,
  children,
  // setDrawerOpen,
  ...props
}: IconDrawerProps) {
  // Animation variants for sliding in and out
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
    <>
      <Box
        className="absolute top-0 right-0"
        onClick={() => setDrawerOpen(true)}
      >
        Open
      </Box>
      <Portal>
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-dv-975 backdrop-blur-sm"
                onClick={() => setDrawerOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ zIndex: "100" }}
              />
              {/* Drawer */}
              <motion.div
                className={`fixed top-2 right-2 w-60px h-fit bg-white shadow-shadow3D z-50 ${className}`}
                style={style}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                {...(props as any)}
              >
                <VStack
                  className="w-full h-full justify-between relative bg-cyanBack border-l-3 border-dv-900 pt-[25px]"
                  gap="gap-0"
                >
                  <Text>One</Text> <Text>Two</Text> <Text>Three</Text>
                  {children}
                  <Box
                    onClick={() => setDrawerOpen(false)}
                    className="absolute top-[2px] right-[2px] border-2 border-dv-175"
                  >
                    <IoIosClose size="20px" />
                  </Box>
                </VStack>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
