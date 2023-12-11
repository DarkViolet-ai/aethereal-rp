import React, { MouseEventHandler } from "react";
import { Spinner } from "./spinner";
import Tooltip from "./tooltip";

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  iconSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
  pos?: "absolute" | "relative" | "fixed" | "sticky" | "static";
  t?: string;
  l?: string;
  r?: string;
  b?: string;
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
  iconSize = "text-[23px]",
  isLoading = false,
  isDisabled = false,
  label,
  pos = "relative",
  t,
  l,
  r,
  b,
  type = "button",
  tooltipPlacement = "bottomRight",
  ...props
}: IconButtonProps) {
  return (
    <div className={`${pos} ${t} ${r} ${l} ${b}`}>
      <Tooltip label={label} placement={tooltipPlacement}>
        <button
          className={`inline-flex items-center justify-center rounded-md text-dv-400 bg-dv-900 border border-solid border-1.5 border-dv-400 shadow-dvShadow transition duration-500 ease-in-out hover:bg-dv-400 hover:text-dv-800 text-shadow-dvTextShadow hover:border-dv-900 ${className}`}
          type={type}
          onClick={onClick}
          disabled={isDisabled || isLoading}
          {...props} // All other HTML button properties are spread here
        >
          {isLoading ? (
            <Spinner />
          ) : (
            React.cloneElement(icon, { className: iconSize }) // Apply the iconSize to the icon
          )}
        </button>
      </Tooltip>
    </div>
  );
}
