import { headingSizes } from "~/css/styles";
import Input from "./input";
import Text from "./textComponents";
import VStack from "./vStack";
import ValidatedInput from "./validatedInput";

interface InputVStackProps {
  isValidated?: boolean;
  validationMin?: number;
  validationMax?: number;
  autoFocus?: boolean;
  isRequired?: boolean;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputVStack(
  props: InputVStackProps,
  autoFocus = false
): React.ReactElement {
  return (
    <VStack
      className={`${headingSizes} leading-1rem w-full props.className`}
      align="start"
      style={props.style}
      gap="gap-0"
    >
      <Text className="text-shadow-textFog">{props.label}</Text>
      {props.isValidated && props.validationMax ? (
        <ValidatedInput
          autoFocus={autoFocus}
          isRequired={props.isRequired}
          min={props.validationMin}
          max={props.validationMax}
          name={props.name}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
      ) : (
        <Input
          autoFocus={autoFocus}
          required={props.isRequired}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          type={props.type}
          onChange={props.onChange}
        />
      )}
    </VStack>
  );
}
