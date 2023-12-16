import { topNavPadding } from "~/css/styles";
import Flex from "~/components/buildingBlocks/flex";
import ParchmentPage from "./components/parchmentPage";
import InteractionPage from "./components/interactionPage";
import Transition from "~/components/buildingBlocks/transition";
import { useRevalidator } from "@remix-run/react";
import VStack from "~/components/buildingBlocks/vStack";
import { HeadingXL } from "~/components/buildingBlocks/textComponents";
import { requireUserId } from "~/lib/utils/session.server";
import { getNextCharacterInStory, getStory } from "~/lib/db/story.server";
import { dvError } from "~/lib/utils/dvError";
import {
  type StoryCharacter,
  assignRolePlayer,
} from "~/lib/db/character.server";
import { StoryStatus } from "@prisma/client";
import { submitStoryGeneration, submitUserPrompt } from "~/lib/queue/queues";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import type { DataFunctionArgs } from "@remix-run/node";
import useStatusStream from "~/lib/hooks/useStatusStream";
import { useEffect } from "react";
import { createServerClient } from "@supabase/auth-helpers-remix";

const bucketName = "images";
const filePath = "public/";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  const response = new Response();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  );

  const userId = await requireUserId(request);
  const storyId = params.storyId as string;
  const story = await getStory({ id: storyId });
  if (!story) throw dvError.notFound("Story not found");
  const { characters: _characters } = story;

  // replace all character avatars with a thumbnail version from getPublicUrl
  const characters = _characters.map((character) => {
    const filename = `${character.id}.png`;
    const avatar = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath + filename, {
        transform: { width: 150, height: 150 },
      }).data.publicUrl;
    return { ...character, avatar };
  });

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

export type StoryLoaderData = typeof loader;

export const action = async ({ request, params }: DataFunctionArgs) => {
  const storyId = params.storyId as string;
  const formData = await request.formData();
  const newInput = formData.get("newInput") as string;
  console.log("submitting for story generation", newInput);
  await submitStoryGeneration({ storyId, input: newInput });
  return typedjson({ status: "ok" });
};

export default function StoryId() {
  const { revalidate } = useRevalidator();
  const { story, isActiveCharacter, characterName } =
    useTypedLoaderData<typeof loader>();

  const storyId = story?.id;
  const data = useStatusStream(storyId);

  useEffect(() => {
    console.log("data", data);
    revalidate();
  }, [data, revalidate]);

  return (
    <Flex
      className={`w-full h-full justify-start items-center flex-col lg:flex-row lg:justify-center lg:items-start overflow-y-hidden ${topNavPadding}`}
    >
      <Transition type="fade" className="w-full h-full lg:w-7/12 ">
        <VStack className="w-full h-full justify-center">
          <Flex className="flex-shrink-0 py-2">
            <HeadingXL>{story?.title || ""}</HeadingXL>
          </Flex>
          <Flex className="w-full h-full px-[2vw] pb-[2vh]">
            <ParchmentPage
              isActiveCharacter={isActiveCharacter}
              story={story}
              characterName={characterName}
            />
          </Flex>
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
