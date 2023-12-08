import Flex from "../buildingBlocks/flex";
import Text from "../buildingBlocks/text";

interface StoryCardProps {
  title: string;
  summary: string;
  image: string;
  link: string;
  bgColor: string;
}
export default function StoryCard({
  title,
  summary,
  image,
  link,
  bgColor,
}: StoryCardProps) {
  return (
    <Flex
      className={`w-full h-full shadow-shadow3D p-2 relative  ${bgColor} bg-darkVioletGrad border-2 border-dv-700`}
    >
      <Text>{title}</Text>
      <Text>{summary}</Text>
      <Text>{image}</Text>
      <Text>{link}</Text>
    </Flex>
  );
}
