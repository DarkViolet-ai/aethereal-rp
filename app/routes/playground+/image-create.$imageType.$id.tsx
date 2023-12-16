import { Character, Story, StoryTemplate } from "@prisma/client";
import { DataFunctionArgs } from "@remix-run/node";
import { Form, useRevalidator } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { createServer } from "http";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Button from "~/components/buildingBlocks/button";
import HStack from "~/components/buildingBlocks/hStack";
import { openaiImageGenerator } from "~/lib/ai/openaiGenerator.server";
import {
  OpenCharacterView,
  StoryCharacter,
  getCharacter,
  updateCharacterAvatar,
} from "~/lib/db/character.server";
import { getStory, updateImageInStory } from "~/lib/db/story.server";
import {
  getStoryTemplate,
  updateTemplateImage,
} from "~/lib/db/storyTemplate.server";
import { dvError } from "~/lib/utils/dvError";
import { redis } from "~/lib/utils/redis.server";

const storyImagePrompt = (story: Story | StoryTemplate) => {
  const { title, summary } = story;
  return `Create an imaginative and visually stunning artwork inspired by the story titled ${title}.
  with the following description: ${summary}.
   The image should capture the essence and themes of the story, blending elements of fantasy, 
   mysticism, and adventure. The artwork should be rich in color and detail, evoking 
   a sense of wonder and intrigue. It should include symbolic elements related to the story's content,
    creating a magical and otherworldly atmosphere. The composition should be balanced and aesthetically 
    pleasing, suitable for use as a captivating and memorable illustration on a game card. The image should
    be a single continuous scene, not a collection of separate images.  The image will not contain any
    written words or numbers, just a single continuous scene that is based on the title and description of the story.
    There is no text whatsoever in this image.`;
};

const characterImagePrompt = (character: OpenCharacterView) => {
  const { name, description, story: title, story: summary } = character;
  return `Create an imaginative and visually stunning artwork inspired by the character ${name} 
  with the following description: ${description}.  This character is from the story titled ${title},
  with the following description: ${summary}.
   The image should capture the essence and themes of the character, blending elements of fantasy, 
   mysticism, and adventure. The artwork should be rich in color and detail, evoking 
   a sense of wonder and intrigue. It should include symbolic elements related to the character's content,
    creating a magical and otherworldly atmosphere. The composition should be balanced and aesthetically 
    pleasing, suitable for use as a captivating and memorable illustration on a game card. The image should
    be a single continuous scene, not a collection of separate images.  Absolutely no text whatsoever in this image.
    No handwriting.  No letters or numbers. No words.  Only a single continuous scene that is based on the name and description of the character
    and the title and description of the story.  There is no text whatsoever in this image.`;
};

export const characterImageLoader = async (characterId: string) => {
  const character = await getCharacter(characterId);
  if (!character) throw dvError.notFound("Character not found");
  const { avatar } = character;
  if (avatar) {
    return typedjson({ imageUrl: avatar, imageCandidateUrl: null });
  }

  const imageKey = `image:character:${character.id}`;
  const cachedImageUrl = await redis.get(imageKey);
  if (cachedImageUrl) {
    return typedjson({ imageUrl: cachedImageUrl, imageCandidateUrl: null });
  }
  const response = await openaiImageGenerator({
    prompt: characterImagePrompt(character),
  });
  const imageCandidateUrl = response.data[0].url;
  // debounce the image generation
  imageCandidateUrl && (await redis.setex(imageKey, 3, imageCandidateUrl));
  return typedjson({ imageCandidateUrl, imageUrl: null });
};

export const storyImageLoader = async (storyId: string) => {
  const story = await getStory({ id: storyId });
  if (!story) throw dvError.notFound("Story not found");
  const { imageUrl } = story;
  if (!imageUrl) {
    const imageKey = `image:story:${story.id}`;
    const cachedImageUrl = await redis.get(imageKey);
    if (cachedImageUrl) {
      return typedjson({ imageUrl: cachedImageUrl, imageCandidateUrl: null });
    }
    const response = await openaiImageGenerator({
      prompt: storyImagePrompt(story),
    });
    const imageCandidateUrl = response.data[0].url;
    // debounce the image generation
    imageCandidateUrl && (await redis.setex(imageKey, 3, imageCandidateUrl));
    return typedjson({ imageCandidateUrl, imageUrl: null });
  }
  return typedjson({ imageUrl, imageCandidateUrl: null });
};

export const storyTemplateImageLoader = async (storyId: string) => {
  const storyTemplate = await getStoryTemplate({ id: storyId });
  if (!storyTemplate) throw dvError.notFound("Story template not found");
  const { imageUrl } = storyTemplate;
  if (!imageUrl) {
    const imageKey = `image:story-template:${storyTemplate.id}`;
    const cachedImageUrl = await redis.get(imageKey);
    if (cachedImageUrl) {
      return typedjson({ imageUrl: cachedImageUrl, imageCandidateUrl: null });
    }
    const response = await openaiImageGenerator({
      prompt: storyImagePrompt(storyTemplate),
    });
    const imageCandidateUrl = response.data[0].url;
    // debounce the image generation
    imageCandidateUrl && (await redis.setex(imageKey, 3, imageCandidateUrl));
    return typedjson({ imageCandidateUrl, imageUrl: null });
  }
  return typedjson({ imageUrl, imageCandidateUrl: null });
};

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const imageType = params.imageType as string;
  const id = params.id as string;
  if (imageType === "story") {
    return storyImageLoader(id);
  } else if (imageType === "story-template") {
    return storyTemplateImageLoader(id);
  }
  return characterImageLoader(id);
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const imageType = params.imageType as string;
  const id = params.id as string;
  if (imageType === "story") {
    const story = await getStory({ id });
    if (story?.imageUrl) {
      //removing the url here will trigger update on the loader.
      await updateImageInStory({ storyId: story.id, imageUrl: null });
      return typedjson({ status: "ok" });
    }
  } else if (imageType === "story-template") {
    const storyTemplate = await getStoryTemplate({ id });
    if (storyTemplate?.imageUrl) {
      //removing the url here will trigger update on the loader.
      await updateTemplateImage({ id: storyTemplate.id, imageUrl: null });
      return typedjson({ status: "ok" });
    }
  } else {
    const character = await getCharacter(id);
    if (character?.avatar) {
      await updateCharacterAvatar({ characterId: character.id, avatar: null });
    }
  }
  const response = new Response();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      request,
      response,
    }
  );
  const formData = await request.formData();
  const imageUrl = formData.get("imageUrl") as string;
  const imageData = await fetch(imageUrl);
  // convert imageData into a file buffer that can be uploaded with supabase.storage.from().upload()
  const buffer = await imageData.arrayBuffer();
  const file = new File([buffer], "image.png", { type: "image/png" });
  const { data: bucketData, error: bucketError } =
    await supabase.storage.getBucket("images");
  if (bucketError) {
    console.error(bucketError);
    return typedjson({ status: "error" });
  }

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${id}.png`, file, { upsert: true });
  if (error) {
    console.error(error);
    return typedjson({ status: "error" });
  }
  const newIMageUrl = supabase.storage
    .from("images")
    .getPublicUrl(`public/${id}.png`).data.publicUrl;

  imageType === "story"
    ? await updateImageInStory({ storyId: id, imageUrl: newIMageUrl })
    : imageType === "story-template"
    ? await updateTemplateImage({ id, imageUrl: newIMageUrl })
    : await updateCharacterAvatar({ characterId: id, avatar: newIMageUrl });
  return typedjson({ status: "ok" });
};

export default function NewImage() {
  const { revalidate } = useRevalidator();
  const { imageUrl, imageCandidateUrl } = useTypedLoaderData<typeof loader>();
  console.log({ imageUrl, imageCandidateUrl });
  return (
    <div className="w-full h-full overflow-y-auto">
      <h1>Image</h1>
      <img src={imageUrl ?? imageCandidateUrl} onLoad={(e) => {}} />
      <Form method="post">
        {imageCandidateUrl && (
          <HStack>
            <input type="hidden" name="imageUrl" value={imageCandidateUrl} />
            <Button type="submit">Accept</Button>
            <Button onClick={() => revalidate()}>Regenerate</Button>
          </HStack>
        )}
        {imageUrl && <Button type="submit">Regenerate</Button>}
      </Form>
    </div>
  );
}
