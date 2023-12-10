import React, { useState } from "react";
import Input from "./input";
import ImageIcon from "../specialty/imageIcon";
import VStack from "./vStack";

interface ValidatedInputProps {
  defaultValue?: string;
  min?: number;
  max: number;
  autoFocus?: boolean;
  additionalStyles?: string;
  isRequired?: boolean;
  name?: string;
  id?: string;
  onValidityChange?: (isValid: boolean) => void;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ValidatedInput({
  defaultValue = "",
  min = 3,
  max,
  autoFocus = false,
  additionalStyles = "",
  isRequired = false,
  name = "",
  id = "",
  onChange,
  onValidityChange,
  placeholder = "",
}: ValidatedInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  // Compute the class strings based on conditions
  const isInvalid = inputValue.length < min || inputValue.length > max;
  const inputClass = isInvalid
    ? `border-pinkest shadow-[0_0_0_1px_lilac] ${additionalStyles}`
    : `${additionalStyles}`;
  const textColorClass = isInvalid ? `text-dv-400` : `text-dv-175`;
  const textShadowClass = isInvalid
    ? "text-shadow-dvTextShadow"
    : "text-shadow-none";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };
  const baseTextStyle =
    "text-[18px] font-semibold leading-none sm:leading-1rem";
  const fieldTooShort = inputValue.length < min;
  const fieldTooLong = inputValue.length > max;
  return (
    <VStack className="w-full flex flex-col space-y-0">
      <Input
        autoFocus={autoFocus}
        value={inputValue}
        type="text"
        name={name}
        id={id}
        className={inputClass}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={isRequired}
      />
      <div className={`flex space-x-1 w-full ${textColorClass} `}>
        <span
          className={`${textColorClass} ${textShadowClass} ${baseTextStyle}`}
        >
          {inputValue.length} / {max} chars -
        </span>

        <div className="flex space-x-1">
          {isInvalid && fieldTooLong && (
            <>
              <ImageIcon keyword="warning" h="h-[22px]" w="w-[22px]" />
              <span
                className={`${textColorClass} ${textShadowClass}  ${baseTextStyle}`}
              >
                Backspace 😱
              </span>
            </>
          )}
          {isInvalid && fieldTooShort && (
            <span
              className={` ${baseTextStyle} ${textColorClass} ${textShadowClass}`}
            >
              Gonna need at least {min} chars.
            </span>
          )}
        </div>
      </div>
    </VStack>
  );
}
