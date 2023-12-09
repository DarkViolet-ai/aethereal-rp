import Flex from "./flex";
import Text from "./text";

interface LabelValueProps {
  label: string;
  value: string;
  direction: "flex-row" | "flex-column";
  className?: string;
}

export default function LabelValue({
  label,
  value,
  direction,
  className = "",
}: LabelValueProps) {
  return (
    <Flex className={`${direction}, ${className}`}>
      <Text className="text-dv-400 font-bold">{label}</Text>
      <Text className="text-dv-100">{value}</Text>
    </Flex>
  );
}
