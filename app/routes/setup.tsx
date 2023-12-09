import { DataFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import VStack from "~/components/buildingBlocks/vStack";
import { borderShadow } from "~/css/styles";
import { beginStory } from "~/lib/ai/narrator.server";
import { narratorInstructions } from "~/lib/ai/narratorInstructions";
import { openaiGenerator } from "~/lib/ai/openaiGenerator.server";
import { getStory, getUser } from "~/lib/db/db.server";
import { dvError } from "~/lib/utils/dvError";

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await getUser("seed-user-id-1");
  const initStory = await getStory({ id: "seed-story-id-1" });
  if (!initStory || !user)
    throw dvError.internalServerError("Could not find story or user");
  initStory.version += 1;

  const generator = openaiGenerator;
  const { story, narrator, prompt } = await beginStory({
    ...initStory,
    narratorInstructions,
    generator,
  });
  return typedjson({ story, narrator, prompt });
};

export default function Setup() {
  const { story, narrator, prompt } = useTypedLoaderData<typeof loader>();
  return (
    <Flex className="w-full h-full justify-center pt-[50px] pb-[35px] items-center">
      <VStack className="w-full p-4" gap="gap-5">
        <Box
          className={`w-11/12 md:w-3/4 xl:w-2/3 xxl:w-1/2 h-[400px] ${borderShadow}`}
        >
          <Box className="w-full h-[400px] bg-dv-800 shadow-shadow3D p-2 overflow-y-auto">
            <Text>{story.content}</Text>
            <Text>{prompt}</Text>
          </Box>
        </Box>
        <Box className="w-11/12 md:w-3/4  xl:w-2/3  xxl:w-1/2">
          <TextAreaVStack label="Type Things Here" className="w-full h-full" />
        </Box>
        <Button type="submit">Submit</Button>
      </VStack>
    </Flex>
  );
}
