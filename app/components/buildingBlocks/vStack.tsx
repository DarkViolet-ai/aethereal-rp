import React from "react";

interface VStackProps {
  children: React.ReactNode;
  gap?: string;
  style?: React.CSSProperties;
  align?: string;
  className?: string;
}

export default function VStack({
  children,
  gap = "gap-2",
  className = "",
  style = {},
  align = "items-center",
}: VStackProps) {
  return (
    <div className={`flex flex-col ${align} ${gap} ${className}`} style={style}>
      {children}
    </div>
  );
}
