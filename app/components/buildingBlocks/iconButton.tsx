import React, { type MouseEventHandler } from "react";
import { Spinner } from "./spinner";
import Tooltip from "./tooltip";

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: React.ComponentType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  iconSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
  pos?: "absolute" | "relative" | "fixed" | "sticky" | "static" | "inherit";
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
  icon: Icon,
  onClick,
  className = "",
  iconSize = "text-[23px] fullHD:text-[30px] quadHD:text-[30px] ultraHD:text-[50px]",
  isLoading = false,
  isDisabled = false,
  label,
  pos = "absolute",
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
          className={`flex flex-shrink-0 font-semibold justify-center text-[2vh] leading-[3.5vh] lg:text-[2.3vh] lg:leading-[3.5vh] items-center fullHD:p-[1vh] shadow-dvShadow rounded-md text-dv-400 bg-dv-800 border border-solid border-1.5 quadHD:border-3 ultraHD:border-5 border-dv-400 transition duration-500 ease-in-out hover:bg-dv-400 hover:text-dv-900 hover:border-dv-900 hover:shadow-dvshadow hover:text-shadow-lightTextShadow ultraHD:border-6  h-8 w-8 md:h-9 md:w-9 quadHD:h-12 quadHD:w-12 ultraHD:h-24 ultraHD:w-24 ${className}`}
          type={type}
          onClick={onClick}
          disabled={isDisabled || isLoading}
          {...props}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={iconSize}>
              <Icon />
            </div>
          )}
        </button>
      </Tooltip>
    </div>
  );
}
