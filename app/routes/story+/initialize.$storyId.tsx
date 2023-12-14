import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Box from "~/components/buildingBlocks/box";
import Flex from "~/components/buildingBlocks/flex";
import VStack from "~/components/buildingBlocks/vStack";
import Text from "~/components/buildingBlocks/text";
import { borderShadow, topNavPadding } from "~/css/styles";
import { getStory } from "~/lib/db/story.server";
import useStatusStream from "~/lib/hooks/useStatusStream";
import { Link, Outlet, useParams, useRevalidator } from "@remix-run/react";
import { DataFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const storyId = params.storyId as string;
  const story = await getStory({ id: storyId });
  return typedjson({ story });
};

export default function Setup() {
  const { storyId } = useParams() as {
    storyId: string;
    characterId: string;
  };
  const { revalidate } = useRevalidator();

  const data = useStatusStream(storyId);
  const { story } = useTypedLoaderData<typeof loader>();

  useEffect(() => {
    if (data) {
      console.log(data);
      revalidate();
    }
  }, [data]);

  return (
    <Flex
      className={`w-full h-full justify-center ${topNavPadding} items-center`}
    >
      <VStack className="w-full p-4" gap="gap-5">
        <Box
          className={`w-11/12 md:w-3/4 xl:w-2/3 xxl:w-1/2 h-[400px] ${borderShadow}`}
        >
          <Box className="w-full h-[400px] bg-dv-800 shadow-shadow3D p-2 overflow-y-auto">
            <Text>{story?.content}</Text>
          </Box>
        </Box>
        {story?.characters.map(
          (character) =>
            character.rolePlayer === null && (
              <Box key={character.id}>
                <Link to={`/story/${storyId}/${character.id}`}>
                  <Text>{character.name}</Text>
                </Link>
                <Text>{character.description}</Text>
                <Text>Status: {story.status}</Text>
              </Box>
            )
        )}
      </VStack>
    </Flex>
  );
}
