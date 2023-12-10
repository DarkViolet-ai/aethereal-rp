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
      className={`px-2 py-1 bg-dv-900 h-[35px] text-dv-100 w-full rounded-md shadow-shadow3D text-[16px] focus:border-dv-400 hover:border-dv-400 ${className}`}
      style={style}
      {...props}
    />
  );
}
