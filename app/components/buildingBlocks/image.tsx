import type { CSSProperties, ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  w?: string;
  h?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  pos?: "absolute" | "relative" | "fixed";
  t?: string;
  b?: string;
  l?: string;
  r?: string;
  zIndex?: string;
  borderRadius?: string;
  shadow?: string;
  rounded?: string;
  className?: string;
}

export default function Image({
  src,
  alt,
  w = "auto",
  h = "auto",
  objectFit = "cover",
  pos,
  t,
  b,
  l,
  r,
  zIndex,
  borderRadius = "10px",
  shadow = "none",
  rounded,
  className,
  ...props
}: ImageProps) {
  const imageStyle: CSSProperties = {
    objectFit,
    position: pos,
    top: t,
    bottom: b,
    left: l,
    right: r,
    zIndex,
    borderRadius,
    boxShadow: shadow,
    // Only apply width and height if they are not 'auto'
    ...(w !== "auto" && { width: w }),
    ...(h !== "auto" && { height: h }),
  };

  return (
    <img
      src={src}
      alt={alt}
      style={imageStyle}
      {...props}
      className={`${rounded} ${shadow} ${className}`}
    />
  );
}
