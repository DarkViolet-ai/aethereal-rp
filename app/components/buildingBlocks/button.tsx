import type { ReactNode, MouseEventHandler } from "react";
import { buttonDimensions, textSizes } from "~/css/styles";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex justify-center items-center px-4 py-0 text-md leading-none shadow-dvShadow rounded-md text-dv-400 text-shadow-dvTextShadow bg-dv-800 border border-solid border-1.5 border-dv-400 transition duration-500 ease-in-out  hover:bg-dv-400 hover:text-dv-900 hover:border-dv-900 hover:shadow-dvshadow hover:text-shadow-lightTextShadow ${textSizes} ${buttonDimensions} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
