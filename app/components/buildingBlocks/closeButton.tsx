import { CloseIcon } from "~/css/styles";
import IconButton from "./iconButton";

export function CloseButton({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <IconButton
      label="close"
      icon={CloseIcon}
      onClick={onClose}
      className={` m-2 z-10 ${className}`}
      position="absolute"
      top="top=0"
      right="right-0"
      tooltipPlacement="left"
    />
  );
}
