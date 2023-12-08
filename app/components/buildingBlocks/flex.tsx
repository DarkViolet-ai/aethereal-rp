import type { ReactNode } from "react";

interface FlexProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Flex({
  children,
  style,
  onClick = () => {},
  className = "",
}: FlexProps) {
  return (
    <div className={`flex ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
