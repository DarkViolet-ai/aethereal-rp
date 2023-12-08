import { useNavigate } from "@remix-run/react";
import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function Button({
  children,
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center h-[30px] px-4 py-0 text-md leading-none shadow-dvShadow rounded-md text-dv-400 bg-dv-900 border border-solid border-1.5 border-dv-400 transition duration-500 ease-in-out  hover:bg-dv-400 hover:text-dv-900 hover:border-dv-900 hover:shadow-dvshadow  ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

interface DrawerButtonProps {
  children: ReactNode;
  link: string;
  className?: string;
}

export function MainNavButton({
  children,
  link,
  className = "",
  ...props
}: DrawerButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={`w-[250px] h-[40px] flex justify-center items-center md:h-10 px-4 py-1 shadow-dvShadow rounded-sm text-dv-100 text-shadow-dvTextShadow bg-dv-500 border border-solid border-1 border-black transition duration-500 ease-in-out  hover:bg-dv-800 hover:text-dv-300 hover:border-dv-900 hover:shadow-dvshadow  ${className}`}
      onClick={() => navigate(link)}
      {...props}
    >
      {children}
    </button>
  );
}
