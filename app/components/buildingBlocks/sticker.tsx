import { useState, useEffect, type CSSProperties } from "react";
import FadeIn from "./fadeIn"; // Assuming you have a Tailwind version of FadeIn
import Image from "./image";

interface StickerProps {
  fadeDuration?: string;
  randomFade?: boolean;
  position?: "absolute" | "relative" | "fixed" | "sticky";
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  src: string;
  w?: string;
  h?: string;
  maxW?: string;
  zIndex?: string;
  showAt?: "base" | "sm" | "md" | "lg" | "xl" | "xxl";
  transform?: string;
  animate?:
    | "blink"
    | "heartbeat"
    | "spin"
    | "swing"
    | "float"
    | "shake"
    | "flipHorizontal"
    | "flipVertical"
    | "none";
  animationDuration?: string;
  heartbeatStartSize?: string;
  heartbeatEndSize?: string;
}

export default function Sticker({
  fadeDuration = "0.4s",
  randomFade = false,
  position = "absolute",
  top,
  bottom,
  left,
  right,
  src,
  w = "auto",
  h = "auto",
  maxW,
  zIndex = "z-1",
  showAt = "base",
  transform,
  animate = "none",
  animationDuration = "4s",
  heartbeatStartSize = "0.5",
  heartbeatEndSize = "1.2",
}: StickerProps) {
  const [finalFadeDuration, setFinalFadeDuration] = useState(fadeDuration);
  // Tailwind CSS classes for animation
  const animationClasses: Record<string, string> = {
    blink: "animate-blink",
    heartbeat: "animate-heartbeat",
    spin: "animate-spin",
    swing: "animate-swing",
    float: "animate-float",
    shake: "animate-shake",
    flipHorizontal: "animate-flip-horizontal",
    flipVertical: "animate-flip-vertical",
    none: "", // Add this line
  };
  useEffect(() => {
    if (randomFade) {
      const randomDuration = `${0.1 + Math.random() * 0.2}s`;
      setFinalFadeDuration(randomDuration);
    }
  }, [randomFade]);

  // Custom animation styles
  const customAnimationStyles: CSSProperties = {
    animation: animationClasses[animate]
      ? `${animationClasses[animate]} ${animationDuration} infinite`
      : "none",
    transform,
  };

  // Tailwind CSS classes for responsive display
  const displayClasses = {
    base: "hidden",
    [showAt]: "block",
  };

  return (
    <FadeIn speed={finalFadeDuration}>
      <div
        className={`${displayClasses[showAt]} ${position} ${top} ${bottom} ${left} ${right} ${zIndex}`}
        style={{
          maxWidth: maxW,
          width: w,
          height: h,
          ...customAnimationStyles,
        }}
      >
        <Image src={src} alt="" />
      </div>
    </FadeIn>
  );
}
