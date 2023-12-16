// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import VStack from "./vStack";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";
import IconButton from "./iconButton";
import Portal from "./portal";
import { CloseButton } from "./closeButton";
import { defaultOverlayBlur, defaultOverlayColor } from "~/css/styles";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  slideDirection?:
    | "top-right"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | "top-left"
    | "top-center"
    | "top"
    | "right"
    | "bottom"
    | "left";
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon: React.ComponentType;
  label?: string;
  drawerWidth?: string;
  drawerHeight?: string;
  buttonPos?: "absolute" | "relative" | "fixed" | "sticky" | "static";
  buttonT?: string;
  buttonR?: string;
  buttonB?: string;
  buttonL?: string;
  showBottomButton?: boolean;
  overlayBlur?: string;
  overlayColor?: string;
  drawerBg?: string;
  buttonTooltipPlacement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}

export default function Drawer({
  className = "",
  slideDirection = "right",
  style = {},
  children,
  icon: Icon,
  label,
  buttonPos = "absolute",
  buttonT,
  buttonR,
  buttonB,
  buttonL,
  showBottomButton = true,
  drawerWidth = "w-[400px] ultraHD:w-[800px]",
  drawerBg = "bg-dv-700",
  drawerHeight = "h-100vh",
  overlayBlur = defaultOverlayBlur,
  overlayColor = defaultOverlayColor,
  buttonTooltipPlacement = "bottomRight",
  ...props
}: DrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Animation variants for sliding in and out
  const variants = {
    open: (direction: string) => {
      const transition = { type: "spring", stiffness: 300, damping: 30 };

      const baseVariant = { transition, x: 0, y: 0 };

      switch (direction) {
        case "top-right":
        case "top-left":
        case "top-center":
          return { ...baseVariant, y: 0 };
        case "bottom-right":
        case "bottom-left":
        case "bottom-center":
          return { ...baseVariant, y: 0 };
        case "left":
          return { ...baseVariant, x: 0 };
        case "right":
          return { ...baseVariant, x: 0 };
        default:
          return { ...baseVariant, x: 0 };
      }
    },
    closed: (direction: string) => {
      const transition = { type: "spring", stiffness: 300, damping: 30 };

      switch (direction) {
        case "top-right":
        case "top-left":
        case "top-center":
          return { x: undefined, y: "-100%", transition };
        case "bottom-right":
        case "bottom-left":
        case "bottom-center":
          return { x: undefined, y: "100%", transition };
        case "left":
          return { x: "-100%", y: undefined, transition };
        case "right":
          return { x: "100%", y: undefined, transition };
        default:
          return { x: "100%", y: undefined, transition };
      }
    },
  };

  const drawerPositionClass = (direction: string) => {
    switch (direction) {
      case "top-right":
        return "top-0 right-0";
      case "top-left":
        return "top-0 left-0";
      case "top-center":
        return "top-0 left-1/2 -translate-x-1/2";
      case "bottom-right":
        return "bottom-0 right-0";
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-center":
        return "bottom-0 left-1/2 -translate-x-1/2";
      case "left":
        return "left-0 top-1/2 -translate-y-1/2";
      case "right":
        return "right-0 top-1/2 -translate-y-1/2";
      default:
        return "top-0 right-0";
    }
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
      {" "}
      {Icon && label && (
        <IconButton
          icon={Icon}
          alt={label}
          label={label}
          onClick={() => setDrawerOpen(true)}
          pos={buttonPos}
          t={buttonT}
          r={buttonR}
          b={buttonB}
          l={buttonL}
          tooltipPlacement={buttonTooltipPlacement}
        />
      )}
      <Portal>
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className={`fixed inset-0 ${overlayColor} ${overlayBlur} z-40`}
                onClick={() => setDrawerOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Drawer */}
              <motion.div
                className={`fixed ${drawerPositionClass(
                  slideDirection
                )} shadow-dvShadow z-50 ${drawerHeight} ${className} ${drawerWidth}`}
                style={style}
                variants={variants}
                custom={slideDirection}
                initial="closed"
                animate="open"
                exit="closed"
                {...(props as any)}
              >
                <VStack
                  className={`w-full h-full justify-between relative ${drawerBg} border-l-3 border-dv-900`}
                  gap="gap-0"
                >
                  <Flex className="w-full h-full relative">
                    <CloseButton onClose={() => setDrawerOpen(false)} />
                    {showBottomButton && (
                      <Flex className="w-full h-[6vh] bg-darkGrayBack rounded-t-none border-t-2 border-dv-850 justify-center fixed bottom-0 left-0 items-center">
                        <CloseTextButton onClose={() => setDrawerOpen(false)} />
                      </Flex>
                    )}

                    <Flex className="w-full h-full pb-[6vh]">{children}</Flex>
                  </Flex>
                </VStack>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
