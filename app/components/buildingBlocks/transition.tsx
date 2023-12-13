// PageTransition.tsx

import { motion, AnimatePresence, type Variants } from "framer-motion";
import React, { type ReactNode } from "react";

export type TransitionType =
  | "fade"
  | "scale"
  | "slide"
  | "rotate"
  | "flip"
  | "zoom"
  | "slideInLeft"
  | "slideInTopLeft"
  | "slideInBottomLeft"
  | "slideInTop"
  | "slideInTopRight"
  | "slideInRight"
  | "slideInBottomRight"
  | "slideInBottom";

interface TransitionProps {
  children: ReactNode;
  className?: string;
  type: TransitionType;
  delay?: number;
  duration?: number;
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
  slideInLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  slideInTopLeft: {
    initial: { x: "-100%", y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: "-100%" },
  },
  slideInBottomLeft: {
    initial: { x: "-100%", y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: "100%" },
  },
  slideInTop: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  slideInTopRight: {
    initial: { x: "100%", y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: "-100%" },
  },
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  slideInBottomRight: {
    initial: { x: "100%", y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: "100%" },
  },
  slideInBottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
};

export default function Transition({
  children,
  type,
  delay = 0,
  className = "",
  duration = 0.5,
}: TransitionProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        key={type}
        variants={transitionVariants[type]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
