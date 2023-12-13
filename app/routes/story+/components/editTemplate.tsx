import { Form } from "@remix-run/react";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Input from "~/components/buildingBlocks/input";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";

interface EditTemplateProps {
  title: string;
  summary: string;
}

export default function EditTemplate({ title, summary }: EditTemplateProps) {
  return (
    <VStack className="w-full">
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
          </HStack>
        </Form>
      </Flex>
    </VStack>
  );
}
