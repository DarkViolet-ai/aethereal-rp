import React, { useState } from "react";
import { textSizes } from "~/css/styles";

interface TooltipProps {
  label?: string;
  bg?: string; // e.g., 'bg-red-500'
  color?: string; // e.g., 'text-white'
  w?: string; // Tailwind width classes e.g., 'w-auto'
  fontSize?: string; // e.g., 'text-base'
  children?: React.ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  displacementPercentage?: string; // Custom calculation may be needed
}

export default function Tooltip({
  label,
  bg = "bg-dv-200",
  color = "text-dv-900",
  w = "w-auto",
  fontSize = "text-base",
  children,
  placement = "bottomRight",
}: TooltipProps) {
  const [isHovered, setHovered] = useState(false);

  let placementStyles;
  switch (placement) {
    case "top":
      placementStyles = `bottom-full left-1/2 transform -translate-x-1/2`;
      break;
    case "bottom":
      placementStyles = `top-full left-1/2 transform -translate-x-1/2`;
      break;
    case "left":
      placementStyles = `right-full top-1/2 transform -translate-y-1/2`;
      break;
    case "right":
      placementStyles = `left-full top-1/2 transform -translate-y-1/2`;
      break;
    case "topLeft":
      placementStyles = `bottom-full right-0`;
      break;
    case "topRight":
      placementStyles = `bottom-full left-0`;
      break;
    case "bottomLeft":
      placementStyles = `top-full right-0`;
      break;
    case "bottomRight":
      placementStyles = `top-full left-0`;
      break;
    default:
      placementStyles = "";
  }

  return (
    <div className="relative">
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Child Element */}
        {children}
        {/* Tooltip */}
        {isHovered && (
          <div
            className={`text-shadow-lightTextShadow absolute ${placementStyles} justify-center px-2 py-1 z-30 leading-4 ${w} ${bg} ${color} ${fontSize} font-semibold rounded-sm shadow-dvShadow whitespace-nowrap ${textSizes}`}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
