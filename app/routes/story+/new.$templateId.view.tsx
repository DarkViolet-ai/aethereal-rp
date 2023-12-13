import type { DataFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { createStoryFromTemplate } from "~/lib/db/story.server";
import { getStoryTemplate } from "~/lib/db/storyTemplate.server";
import { submitStoryInitiation } from "~/lib/queue/queues";
import { requireUserId } from "~/lib/utils/session.server";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  return typedjson({
    storyTemplate: await getStoryTemplate({ id: params.templateId as string }),
  });
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const authorId = await requireUserId(request);
  const storyTemplateId = params.storyTemplateId as string;

  const story = await createStoryFromTemplate({
    templateId: storyTemplateId,
    authorId,
  });
  await submitStoryInitiation({ storyId: story.id });
  return redirect(`/story/char-select/${story.id}`);
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
        <Form method="post">
          <Button>Begin Story</Button>
        </Form>

        <Button type="submit">Edit</Button>
      </HStack>
    </VStack>
  );
}
