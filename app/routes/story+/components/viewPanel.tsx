import type { StoryTemplate } from "@prisma/client";
import { Form } from "@remix-run/react";
import { NavLink } from "react-router-dom";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import {
  cardWidths,
  headingSizes,
  //   containerPadding,
  highlightedText,
  negativeStyles,
} from "~/css/styles";

export default function ViewPanel({
  storyTemplate,
}: {
  storyTemplate: StoryTemplate;
}) {
  return (
    <Flex className="w-full justify-center h-full p-4 fullHD:p-6">
      <VStack className={`${cardWidths} gap-4 h-fit lg:h-full`}>
        <Box className="w-80% h-auto lg:h-40%shadow-dvShadow">
          <Image
            src={storyTemplate.imageUrl || "/images/placeholderImage.png"}
            alt={storyTemplate.title}
            h="100%"
            w="100%"
          />
        </Box>
        <VStack className="w-full h-40%">
          <VStack className="w-full justify-start h-34vh">
            <Flex className={`w-full ${cardWidths}`}>
              <Text className={`${headingSizes}`}>{storyTemplate?.title}</Text>
            </Flex>
            <VStack className={`w-full ${cardWidths}`} align="start">
              <Text className={`${highlightedText}`}>Summary</Text>
              <Flex className="w-full h-50% overflow-y-auto">
                <Text>{storyTemplate?.summary}</Text>
              </Flex>
            </VStack>
          </VStack>
          <HStack className={`w-full justify-around`}>
            <NavLink to={`/story/new`}>
              <Button width="w-fit" className={`${negativeStyles}`}>
                Cancel
              </Button>
            </NavLink>
            <Form method="post">
              <Button type="submit" width="w-fit">
                Begin Story
              </Button>
            </Form>
            <NavLink to={`/story/new/${storyTemplate?.id}/edit`}>
              <Button width="w-fit">Edit</Button>
            </NavLink>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
