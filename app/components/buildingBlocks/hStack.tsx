interface HStackProps {
  children?: React.ReactNode;
  gap?: string;
  className?: string;
  onClick?: () => void;
}

export default function HStack({
  children,
  onClick = () => {
    console.log("Clicked");
  },
  gap = "gap-2",
  className = "",
}: HStackProps) {
  return (
    <div className={`flex flex-row ${gap} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
