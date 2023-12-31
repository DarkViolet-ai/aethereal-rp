import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  className = "",
  style,
  ref,
  autoFocus = false,
  ...props
}: InputProps) {
  return (
    <input
      autoFocus={autoFocus}
      ref={ref}
      className={`px-2 py-1 bg-dv-900 h-[35px] fullHD:h-[50px] ultraHD:h-[75px] text-dv-100 w-full rounded-md shadow-shadow3D  focus:border-dv-400 hover:border-dv-400 font-sans ${className} `}
      style={style}
      {...props}
    />
  );
}
