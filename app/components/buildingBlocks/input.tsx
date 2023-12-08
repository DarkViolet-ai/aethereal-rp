import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Input = (
  { className = "", style, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <input
      ref={ref}
      className={`px-2 py-1 bg-dv-900 h-[35px] text-dv-100 w-full rounded-md shadow-shadow3D text-[16px] focus:border-dv-400 hover:border-dv-400 ${className}`}
      style={style}
      {...props}
    />
  );
};

export default React.forwardRef(Input);
