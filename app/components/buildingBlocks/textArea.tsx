import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  style?: React.CSSProperties;
  textAreaHeight?: string;
  textAreaWidth?: string;
  autoFocus?: boolean;
}

export default function TextArea({
  className = "",
  style,
  textAreaHeight = "h-[150px] xxl:h-[200px]  quadHD:h-[275px] ultraHD:h-[450px]",
  textAreaWidth = "w-full",
  autoFocus = false,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      autoFocus={autoFocus}
      className={`p-2 fullHD:p-4 quadHD:p-6 ultraHD:p-8 bg-dv-900 text-dv-100 w-full rounded-md h-9 shadow-shadow3D resize-none focus:border-dv-400 hover:border-dv-400 ${className} ${textAreaHeight} ${textAreaWidth}`}
      style={style}
      {...props}
    />
  );
}
