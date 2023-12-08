import Button from "./button";

export function CloseTextButton({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <Button onClick={onClose} className={` m-2 z-10 ${className}`}>
      Close
    </Button>
  );
}
