import type { ReactNode } from "react";

interface BoxProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Box({
  children,
  onClick,
  style,
  className = "",
}: BoxProps) {
  return (
    <div className={` ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
