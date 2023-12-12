import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import ResponsiveFlex from "~/components/buildingBlocks/responsiveFlex";
import { getActiveOpenCharacters } from "~/lib/db/character.server";
import { getUserStories } from "~/lib/db/user.server";
import { requireUserId } from "~/lib/utils/session.server";
import StoryCharacters from "~/routes/components/storiesCharacters";

export const meta: MetaFunction = () => {
  return [
    { title: "Aethereal RP: Multiverses with Dark Violet" },
    {
      name: "AI and humans co-creating!",
      content: "Welcome to Aethereal RP!",
    },
  ];
};

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const userId = await requireUserId(request);
  const { activeStories, stories } = await getUserStories(userId);
  const availableCharacters = await getActiveOpenCharacters();
  return typedjson({ activeStories, stories, availableCharacters });
};

export type UserStoriesLoaderData = typeof loader;

export default function Index() {
  return (
    <ResponsiveFlex>
      <StoryCharacters />
    </ResponsiveFlex>
  );
}
