import Button from "./button";

export function CloseTextButton({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      className={` m-2 z-10 ${className}`}
      width="w-fit"
    >
      Close
    </Button>
  );
}
