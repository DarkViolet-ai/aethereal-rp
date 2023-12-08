// Badge.tsx
import React from "react";
import Text from "./text";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "subtle" | "outline";
  className?: string;
  style?: React.CSSProperties;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  label?: string;
  bgColor?: string;
  textColor?: string;
}

export default function Badge({
  className = "",
  style,
  rounded = "md",
  children,
  label,
  bgColor = "bg-dv-400",
  textColor = "text-dv-900",
  ...props
}: BadgeProps) {
  const baseClasses = "px-2 text-xs font-semibold leading-none";

  // Merge Tailwind classes with the provided className prop
  const badgeClasses = `${baseClasses} ${rounded} ${className} ${bgColor} ${textColor} shadow-dvShadow `;

  return (
    <div className={badgeClasses} style={style} {...props}>
      <Text>{label?.toUpperCase()}</Text>
    </div>
    // <div className={badgeClasses} style={style} {...props}>
    //   <Text>{label?.toUpperCase()}</Text>
    // </div>
  );
}
