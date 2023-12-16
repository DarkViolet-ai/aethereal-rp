import Box from "~/components/buildingBlocks/box";
import {
  ColumnsPageColumn,
  ColumnsPageContainer,
} from "~/components/buildingBlocks/columnsPage";
import Divider from "~/components/buildingBlocks/divider";
import Flex from "~/components/buildingBlocks/flex";
import Text, {
  Heading2XL,
  Heading3XL,
  HeadingLG,
  HeadingMD,
  HeadingSM,
  HeadingXL,
  Text2XL,
  Text3XL,
  Text4XL,
  Text5XL,
  Text6XL,
  TextLG,
  TextMD,
  TextSM,
  TextXL,
  TextXS,
} from "~/components/buildingBlocks/textComponents";
import VStack from "~/components/buildingBlocks/vStack";
import AvatarModal from "~/components/specialty/avatarModal";
import UserOrAI from "~/components/specialty/userOrAI";
import { topNavPadding } from "~/css/styles";
import RandomText from "~/lib/utils/randomText";

const textExample = RandomText(3, 3);
export default function EvsPlace() {
  return (
    <Flex
      className={`w-full h-full ${topNavPadding} overflow-y-auto justify-center items-center`}
    >
      {/* <AvatarModal /> */}
      <VStack>this</VStack>
      {/* 
      <ColumnsPageContainer title="title" subtitle="subtitle">
        <ColumnsPageColumn heading="heading" transitionType="slideInLeft">
          <VStack gap="gap-1">
            <Text3XL>SIZED TEXT COMPONENTS</Text3XL>
            <TextXS>Text XS - 1.4vh</TextXS>
            <TextSM>Text SM - 1.6vh</TextSM>
            <TextMD>Text MD - 2.1vh</TextMD>
            <TextLG>Text LG - 2.3vh</TextLG>
            <TextXL>TextXL - 3vh</TextXL>
            <Text2XL>Text2XL - 3.5vh</Text2XL>
            <Text3XL>Text3XL - 4vh</Text3XL>
            <Text4XL>Text4XL - 4.2vh</Text4XL>
            <Text5XL>Text5XL - 4.4vh</Text5XL>
            <Text6XL>Text6XL - 5vh</Text6XL>
            <Text className="text-6xl">Text6XL - 5vh</Text> <Divider />
            <Heading3XL>Heading3XL</Heading3XL>
            <Heading2XL>Heading2XL</Heading2XL>
            <HeadingXL>HeadingXL</HeadingXL>
            <HeadingLG>HeadingLG</HeadingLG>
            <HeadingMD>HeadingMD</HeadingMD>
            <HeadingSM>HeadingSM</HeadingSM>
          </VStack>
        </ColumnsPageColumn>
        <ColumnsPageColumn heading="heading" transitionType="slideInLeft">
          {textExample}
        </ColumnsPageColumn>
      </ColumnsPageContainer> */}
    </Flex>
  );
}
