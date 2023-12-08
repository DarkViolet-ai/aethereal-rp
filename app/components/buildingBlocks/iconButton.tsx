import React, { ReactNode, MouseEventHandler, CSSProperties } from "react";
import { Spinner } from "./spinner";
import Tooltip from "./tooltip";

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  iconSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
  position?: "absolute" | "relative" | "fixed" | "sticky";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  type?: "button" | "submit" | "reset";
  tooltipPlacement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}

export default function IconButton({
  icon,
  onClick,
  className = "h-8 w-8 md:h-9 md:w-9",
  iconSize = "1.6rem",
  isLoading = false,
  isDisabled = false,
  label,
  position = "relative",
  top,
  left,
  right,
  bottom,
  type = "button",
  tooltipPlacement = "bottomRight",
  ...props
}: IconButtonProps) {
  // Inline style for the icon size
  const iconStyle: CSSProperties = { fontSize: iconSize };

  return (
    <div className={`${position} ${top} ${right} ${left} ${bottom}`}>
      <Tooltip label={label} placement={tooltipPlacement}>
        <button
          className={`inline-flex items-center justify-center rounded-md text-dv-400 bg-dv-900 border border-solid border-1.5 border-dv-400 shadow-dvShadow transition duration-500 ease-in-out hover:bg-dv-400 hover:text-dv-900 hover:border-dv-900 ${className}`}
          type={type}
          onClick={onClick}
          disabled={isDisabled || isLoading}
          {...props} // All other HTML button properties are spread here
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <span style={iconStyle}>{icon}</span> // Apply the icon size style here
          )}
        </button>
      </Tooltip>
    </div>
  );
}