import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";
import { borderShadow, topNavPadding } from "~/css/styles";
import { getNextCharacterInStory, getStory } from "~/lib/db/story.server";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Box from "~/components/buildingBlocks/box";
import { Form, useParams, useRevalidator } from "@remix-run/react";
import useStatusStream from "~/lib/hooks/useStatusStream";
import { DataFunctionArgs } from "@remix-run/node";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import Button from "~/components/buildingBlocks/button";
import { useEffect } from "react";
import { dvError } from "~/lib/utils/dvError";
import { getUserId, requireUserId } from "~/lib/utils/session.server";
import { StoryCharacter, assignRolePlayer } from "~/lib/db/character.server";
import { submitStoryGeneration, submitUserPrompt } from "~/lib/queue/queues";
import { StoryStatus } from "@prisma/client";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const userId = await requireUserId(request);
  const storyId = params.storyId as string;
  const story = await getStory({ id: storyId });
  if (!story) throw dvError.notFound("Story not found");
  const { characters } = story;

  const characterId = params.characterId as string;
  const character = characters.find((c) => c.id === characterId);
  if (!character) throw dvError.notFound("Character not found");

  if (character.rolePlayer && userId !== character.rolePlayer.id) {
    throw dvError.forbidden("You are not allowed to play this character");
  } else if (!character.rolePlayer) {
    assignRolePlayer({ characterId, userId });
  }
  const rolePlayerCount = new Set(
    characters
      .filter((c: StoryCharacter) => c.rolePlayer !== null)
      .map((c: StoryCharacter) => c.rolePlayer?.id)
  ).size;
  console.log("rolePlayerCount", rolePlayerCount);
  if (rolePlayerCount === 1 && story.status !== StoryStatus.NARRATOR) {
    await submitUserPrompt({ story });
  }
  const nextCharacterData = story && getNextCharacterInStory({ story });
  const isActiveCharacter = nextCharacterData?.characterId === characterId;

  return typedjson({ story, isActiveCharacter });
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const storyId = params.storyId as string;
  const characterId = params.characterId as string;
  const formData = await request.formData();
  const newInput = formData.get("newInput") as string;
  console.log("submitting for story generation", newInput);
  await submitStoryGeneration({ storyId, input: newInput });
  return typedjson({ status: "ok" });
};

export default function Story() {
  const { storyId, characterId } = useParams() as {
    storyId: string;
    characterId: string;
  };
  const { story, isActiveCharacter } = useTypedLoaderData<typeof loader>();

  const data = useStatusStream(storyId);
  const { revalidate } = useRevalidator();
  useEffect(() => {
    if (data) {
      console.log(data);
      revalidate();
    }
  }, [data]);
  return (
    <Flex
      className={`w-full h-full justify-center ${topNavPadding}  pb-[35px] items-center`}
    >
      <VStack className="w-full p-4" gap="gap-5">
        <Box
          className={`w-11/12 md:w-3/4 xl:w-2/3 xxl:w-1/2 h-[400px] ${borderShadow}`}
        >
          <Box className="w-full h-[400px] bg-dv-800 shadow-shadow3D p-2 overflow-y-auto">
            <Text>{story?.content}</Text>
            <Text>{isActiveCharacter ? story?.prompt : ""}</Text>
          </Box>
        </Box>
        <Form
          method="post"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input type="hidden" name="storyId" value={storyId} />
          <VStack gap="gap-[20px]">
            <Box className="w-11/12 md:w-3/4  xl:w-2/3  xxl:w-1/2 justify-center">
              <TextAreaVStack
                label="Type Things Here"
                className="w-full h-full"
                name="newInput"
              />
            </Box>
            <Button type="submit" className="w-[200px]">
              Submit
            </Button>
          </VStack>
        </Form>
      </VStack>
    </Flex>
  );
}
