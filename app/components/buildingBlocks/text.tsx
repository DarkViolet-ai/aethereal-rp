import type { ReactNode } from "react";

interface TextProps {
  children?: ReactNode;
  className?: string;
  noOfLines?: number;
}

export default function Text({
  children,
  className = "",
  noOfLines,
}: TextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical"; // Deprecated but necessary for line clamping in WebKit browsers
  }

  return (
    <p className={className} style={style}>
      {children}
    </p>
  );
}
