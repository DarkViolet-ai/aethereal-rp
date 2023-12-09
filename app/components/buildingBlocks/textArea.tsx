import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  style?: React.CSSProperties;
  textAreaHeight?: string;
  textAreaWidth?: string;
}

export default function TextArea({
  className = "",
  style,
  textAreaHeight = "h-[200px]",
  textAreaWidth = "w-full",
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={`px-2 py-1 bg-dv-900 text-dv-100 w-full rounded-md h-9 shadow-shadow3D text-[16px] resize-none focus:border-dv-400 hover:border-dv-400 ${className} ${textAreaHeight} ${textAreaWidth}`}
      style={style}
      {...props}
    />
  );
}
