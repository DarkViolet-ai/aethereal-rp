import { cardColors } from "~/css/styles";
import Flex from "../buildingBlocks/flex";
import Text from "../buildingBlocks/text";

interface CharacterCardProps {
  title: string;
  summary: string;
  characterName: string;
  image: string;
  link: string;
  bgColor: string;
}
export default function CharacterCard({
  characterName,
  title,
  summary,
  image,
  link,
  bgColor = cardColors[1 % cardColors.length],
}: CharacterCardProps) {
  return (
    <Flex
      className={`w-full h-full shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad border-2 border-dv-700`}
    >
      <Text>{characterName}</Text>
      <Text>{title}</Text>
      <Text>{summary}</Text>
      <Text>{image}</Text>
      <Text>{link}</Text>
    </Flex>
  );
}
