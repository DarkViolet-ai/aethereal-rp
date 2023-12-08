import { type ReactNode, useEffect, useState, type CSSProperties } from "react";

interface FadeInProps {
  children?: ReactNode;
  speed?: string; // Speed of the fade-in animation
  className?: string;
}

export default function FadeIn({
  children,
  speed = "0.4s",
  className = "",
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the fade-in effect when the component mounts
  }, []);

  // Style for the fade-in effect
  const fadeInStyle: CSSProperties = {
    transition: `opacity ${speed} ease-in-out`,
    opacity: isVisible ? 1 : 0,
  };

  return (
    <div className={`transition-opacity ${className}`} style={fadeInStyle}>
      {children}
    </div>
  );
}
