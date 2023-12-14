import type { DataFunctionArgs } from "@remix-run/node";
import { Form, NavLink } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { cardWidths, containerPadding, highlightedText } from "~/css/styles";
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
  const storyTemplateId = params.templateId as string;

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
    <Flex className={`w-full h-full justify-center ${containerPadding}`}>
      <VStack className={`w-full h-full ${cardWidths} justify-between py-3`}>
        <Flex className="w-full justify-center h-40vh">
          <Flex className="w-98% shadow-dvShadow">
            <Image
              src={storyTemplate?.imageUrl || ""}
              // src="/images/stories/create_a_new_story.png"
              alt={storyTemplate?.title || "template image"}
              h="100%"
              w="100%"
            />
          </Flex>{" "}
        </Flex>
        <VStack className="w-full justify-start h-34vh">
          <HStack className={`w-full ${cardWidths}`}>
            <Text className={`${highlightedText}`}>Title </Text>
            <Text>{storyTemplate?.title}</Text>
          </HStack>
          <HStack className={`w-full ${cardWidths}`}>
            <Text className={`${highlightedText}`}>Summary</Text>
            <Flex className="w-full ">
              <Text>{storyTemplate?.summary}</Text>
            </Flex>
          </HStack>
        </VStack>
        <HStack className={`w-full justify-around`}>
          <Form method="post">
            <Button type="submit">Begin Story</Button>
          </Form>
          <NavLink to={`/story/new/${storyTemplate?.id}/edit`}>
            <Button>Edit</Button>
          </NavLink>
        </HStack>
      </VStack>
    </Flex>
  );
}
