import { Stories, cursiveText } from "~/css/styles";
import Flex from "~/components/buildingBlocks/flex";
import ParchmentPage from "./components/parchmentPage";
import InteractionPage from "./components/interactionPage";
import Transition from "~/components/buildingBlocks/transition";
import { useParams } from "@remix-run/react";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";
import { requireUserId } from "~/lib/utils/session.server";
import { getNextCharacterInStory, getStory } from "~/lib/db/story.server";
import { dvError } from "~/lib/utils/dvError";
import { StoryCharacter, assignRolePlayer } from "~/lib/db/character.server";
import { StoryStatus } from "@prisma/client";
import { submitStoryGeneration, submitUserPrompt } from "~/lib/queue/queues";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { DataFunctionArgs } from "@remix-run/node";

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

  return typedjson({ story, isActiveCharacter, characterName: character.name });
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

export default function StoryId() {
  const { story, isActiveCharacter, characterName } =
    useTypedLoaderData<typeof loader>();
  const storyId = story?.id;

  // console.log(tempStory);
  return (
    // <Transition type="zoom" className="w-full h-full">
    <Flex className="w-full h-full justify-start items-center flex-col lg:flex-row lg:justify-center lg:items-start pt-7 overflow-y-hidden">
      <Transition type="fade" className="w-full h-full lg:w-7/12 ">
        <VStack className="w-full h-full justify-center py-[5px]">
          <Text
            className={`${cursiveText} text-[33px] md:text-[40px] lg:text-[28px] xl:text-[32px] xxl:text-[34px] text-shadow-textFog`}
          >
            {story?.title || ""}
          </Text>
          <ParchmentPage isActiveCharacter={isActiveCharacter} story={story} />
        </VStack>
      </Transition>
      <Transition
        type="fade"
        delay={0.3}
        className="hidden lg:flex w-full h-full lg:w-5/12 justify-center pt-2"
        duration={0.7}
      >
        <InteractionPage
          story={story}
          isActiveCharacter={isActiveCharacter}
          characterName={characterName}
        />
      </Transition>
    </Flex>
    // </Transition>
  );
}
