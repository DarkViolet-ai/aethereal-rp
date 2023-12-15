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

export function TextXS({
  children,
  className = "text-[1.4vh] leading-[2.2vh]",
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

export function TextSM({
  children,
  className = "text-shadow-dvTextShadow text-[1.6vh] leading-[2.4vh]",
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

export function TextMD({
  children,
  className = "text-shadow-dvTextShadow text-[2.1vh] leading-[2.9vh]",
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

export function TextLG({
  children,
  className = "text-shadow-dvTextShadow text-[2.3vh] leading-[3.1vh]",
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

export function TextXL({
  children,
  className = "text-shadow-dvTextShadow text-[3vh] leading-[3.8vh]",
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

export function Text2XL({
  children,
  className = "text-shadow-dvTextShadow text-[3.5vh] leading-[4.3vh]",
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

export function Text3XL({
  children,
  className = "text-shadow-dvTextShadow text-[4vh] leading-[4.8vh]",
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

export function Text4XL({
  children,
  className = "text-shadow-dvTextShadow text-[4.2vh] leading-[5vh]",
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

export function Text5XL({
  children,
  className = "text-shadow-dvTextShadow text-[4.5vh] leading-[5.3vh]",
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

export function Text6XL({
  children,
  className = "text-shadow-dvTextShadow text-[5vh] leading-[5.8vh]",
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

export function Heading2XL({
  children,
  className = "text-[5.5vh] leading-[6.3vh]",
  noOfLines,
  cursive = true,
  color = "text-dv-400",
  shadow = "text-shadow-dvTextShadow",
}: ExtendedTextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical"; // Deprecated but necessary for line clamping in WebKit browsers
  }

  const textClassName = cursive
    ? `font-cursive ${className} ${color} ${shadow}`
    : `${className} ${color} ${shadow}`;

  return (
    <h1 className={textClassName} style={style}>
      {children}
    </h1>
  );
}

interface ExtendedTextProps extends TextProps {
  color?: string;
  cursive?: boolean;
  shadow?: string;
}

export function HeadingXL({
  children,
  className = "text-[5vh] leading-[5.8vh]",
  noOfLines,
  cursive = true,
  color = "text-dv-400",
  shadow = "text-shadow-dvTextShadow",
}: ExtendedTextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical"; // Deprecated but necessary for line clamping in WebKit browsers
  }

  const textClassName = cursive
    ? `font-cursive ${className} ${color} ${shadow}`
    : `${className} ${color} ${shadow}`;

  return (
    <h1 className={textClassName} style={style}>
      {children}
    </h1>
  );
}

export function HeadingLG({
  children,
  className = "text-[4vh] leading-[4.8vh]",
  noOfLines,
  cursive = true,
  color = "text-dv-400",
  shadow = "text-shadow-dvTextShadow",
}: ExtendedTextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical"; // Deprecated but necessary for line clamping in WebKit browsers
  }

  const textClassName = cursive
    ? `font-cursive ${className} ${color} ${shadow}`
    : `${className} ${color} ${shadow}`;

  return (
    <h1 className={textClassName} style={style}>
      {children}
    </h1>
  );
}

export function HeadingMD({
  children,
  className = "text-[3.5vh] leading-[4.3vh]",
  noOfLines,
  cursive = true,
  color = "text-dv-400",
  shadow = "text-shadow-dvTextShadow",
}: ExtendedTextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical"; // Deprecated but necessary for line clamping in WebKit browsers
  }

  const textClassName = cursive
    ? `font-cursive ${className} ${color} ${shadow}`
    : `${className} ${color} ${shadow}`;

  return (
    <h1 className={textClassName} style={style}>
      {children}
    </h1>
  );
}

export function HeadingSM({
  children,
  className = "text-[3vh] leading-[3.8vh]",
  noOfLines,
  cursive = true,
  color = "text-dv-400",
  shadow = "text-shadow-dvTextShadow",
}: ExtendedTextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical"; // Deprecated but necessary for line clamping in WebKit browsers
  }

  const textClassName = cursive
    ? `font-cursive ${className} ${color} ${shadow}`
    : `${className} ${color} ${shadow}`;

  return (
    <h1 className={textClassName} style={style}>
      {children}
    </h1>
  );
}
