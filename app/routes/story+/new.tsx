import type { DataFunctionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import { Stories, cardWidths, colMaxWidths } from "~/css/styles";
import {
  getAllTemplates,
  getStoryTemplate,
} from "~/lib/db/storyTemplate.server";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const templates = await getAllTemplates();
  return typedjson({ templates });
};

export default function StoryTemplate({
  templates,
}: {
  templates: ReturnType<typeof getAllTemplates>;
}) {
  const dummyData = Stories;
  return (
    <Flex className="h-full w-full pt-50px justify-center overflow-y-hidden">
      <Flex
        className={`w-full h-full flex-col lg:flex-row items-center lg:items-start overflow-y-auto lg:overflow-y-hidden gap-[40px] lg:gap-[10px] py-5`}
      >
        <Flex className={`w-full ${colMaxWidths} h-fit lg:h-full`}>
          <Flex className="w-full h-fit min-h-full lg:h-full justify-center">
            {" "}
            <VStack className={`${cardWidths} bg-dv-700 h-fit lg:h-full`}>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
            </VStack>
          </Flex>
        </Flex>
        <Flex className={`w-full ${colMaxWidths} h-fit lg:h-full `}>
          <Flex className="w-full h-fit min-h-full lg:h-full justify-center">
            {" "}
            <VStack className={`${cardWidths} bg-dv-700 h-fit lg:h-full`}>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
              <Text>TEST</Text>
            </VStack>
          </Flex>
        </Flex>
      </Flex>{" "}
    </Flex>
  );
}
