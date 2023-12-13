import type { DataFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { getStoryTemplate } from "~/lib/db/storyTemplate.server";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  return typedjson({
    storyTemplate: await getStoryTemplate({ id: params.templateId as string }),
  });
};

export default function TemplateDisplay() {
  const { storyTemplate } = useTypedLoaderData<typeof loader>();
  return (
    <VStack className="w-full">
      <Flex className="w-full justify-center">
        <Flex className="w-[300px] shadow-dvShadow">
          <Image
            // src={storyTemplate?.imageUrl}
            src="/images/stories/create_a_new_story.png"
            alt={storyTemplate?.title || "template image"}
            h="100%"
            w="100%"
          />
        </Flex>{" "}
      </Flex>
      <HStack className="w-full">
        <Text>Title </Text>
        <Text>{storyTemplate?.title}</Text>
      </HStack>
      <HStack className="w-full">
        <Text>Summary</Text>
        <Text>{storyTemplate?.summary}</Text>
      </HStack>
      <HStack className="w-full">
        <Button>Create</Button>
        <Button>Edit</Button>
      </HStack>
    </VStack>
  );
}
