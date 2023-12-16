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
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      className={`m-2 z-10 ${className}`}
      pos="absolute"
      t="top=0 quadHD:top-2 ultraHD:top-3"
      r="right-0 quadHD:right-2 ultraHD:right-3"
      tooltipPlacement="left"
    />
  );
}
