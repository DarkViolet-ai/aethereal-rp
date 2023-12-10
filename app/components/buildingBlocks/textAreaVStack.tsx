import React from "react";
import Text from "./text";
import TextArea from "./textArea";
import VStack from "./vStack";

// Update the onChange type to be more generic
interface TextAreaVStackProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  type?: string;
  textAreaWidth?: string;
  textAreaHeight?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export default function TextAreaVStack(
  props: TextAreaVStackProps
): React.ReactElement {
  return (
    <VStack
      className={`w-full ${props.className}`}
      align="start"
      style={props.style}
      gap="gap-0"
    >
      <Text className="text-shadow-dvTextShadow">{props.label}</Text>
      <TextArea
        textAreaHeight={props.textAreaHeight}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={`${props.textAreaWidth} ${props.textAreaHeight} `}
      />
    </VStack>
  );
}
