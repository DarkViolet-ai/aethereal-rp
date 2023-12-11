// PageTransition.tsx

import { motion, AnimatePresence, type Variants } from "framer-motion";
import React, { type ReactNode } from "react";

type TransitionType = "fade" | "scale" | "slide" | "rotate" | "flip" | "zoom";

interface PageTransitionProps {
  children: ReactNode;
  type: TransitionType;
}

const transitionVariants: Record<TransitionType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  },
  slide: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  rotate: {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 90, opacity: 0 },
  },
  flip: {
    initial: { scaleX: -1, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    exit: { scaleX: -1, opacity: 0 },
  },
  zoom: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
};

export const Transition: React.FC<PageTransitionProps> = ({
  children,
  type,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={type} // Change the key to trigger animation on type change
        variants={transitionVariants[type]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
