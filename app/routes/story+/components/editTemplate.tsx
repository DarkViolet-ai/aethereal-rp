import { Form } from "@remix-run/react";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Input from "~/components/buildingBlocks/input";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { cardWidths } from "~/css/styles";

interface EditTemplateProps {
  title: string;
  summary: string;
  imagePath: string;
}

export default function EditTemplate({
  title,
  summary,
  imagePath,
}: EditTemplateProps) {
  return (
    <Flex className="w-full max-w-[750px] justify-center">
      <VStack className={`w-full ${cardWidths}`}>
        <Box className="w-90%">
          <Image src={imagePath} alt={title} h="100%" w="100%" />
        </Box>
        <Flex>
          <Form style={{ width: "100%" }}>
            <Text>Title</Text>
            <Input name="title" defaultValue={title} />
            <Text>Summary</Text>
            <Input name="summary" defaultValue={summary} />
            <HStack className="w-full">
              <Button>Cancel</Button>
              <Button>Save</Button>
              <Button>Begin</Button>
              <Button>Generate Image</Button>
            </HStack>
          </Form>
        </Flex>
      </VStack>
    </Flex>
  );
}
