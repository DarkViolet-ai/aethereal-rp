import type { ReactNode } from "react";

interface FlexProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
}

export default function Flex({
  children,
  style,
  onClick = () => {},
  className = "",
  id,
}: FlexProps) {
  return (
    <div
      id={id}
      className={`flex ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
