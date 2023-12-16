import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  width?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
}

export default function Button({
  children,
  type = "button",
  onClick,
  width,
  className = "",
  ref,
  ...props
}: ButtonProps) {
  const buttonWidth = width || "w-[40vw] md:w-[15vw]";
  return (
    <button
      ref={ref}
      type={type}
      className={`flex h-fit flex-shrink-0 font-semibold justify-center text-[2vh] leading-[3.5vh] lg:text-[2.3vh] lg:leading-[4vh] items-center px-[1.6vw] shadow-dvShadow rounded-md text-dv-400 bg-dv-800 border border-solid border-1.5 quadHD:border-3 ultraHD:border-7 border-dv-400 transition duration-500 ease-in-out hover:bg-dv-400 hover:text-dv-900 hover:border-dv-900 hover:shadow-dvshadow hover:text-shadow-lightTextShadow ultraHD:border-6 ultraHD:rounded-[15px] ${buttonWidth} ${className} `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
