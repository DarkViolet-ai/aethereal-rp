import { Story } from "@prisma/client";
import { DataFunctionArgs } from "@remix-run/node";
import { Form, useRevalidator } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { createServer } from "http";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Button from "~/components/buildingBlocks/button";
import HStack from "~/components/buildingBlocks/hStack";
import { openaiImageGenerator } from "~/lib/ai/openaiGenerator.server";
import { getStory, updateImageInStory } from "~/lib/db/story.server";
import { dvError } from "~/lib/utils/dvError";
import { redis } from "~/lib/utils/redis.server";

const imagePrompt = (story: Story) => {
  const { title, summary } = story;
  return `"Create an imaginative and visually stunning artwork inspired by the story titled ${title}.
  with the following description: ${summary}.
   The image should capture the essence and themes of the story, blending elements of fantasy, 
   mysticism, and adventure. The artwork should be rich in color and detail, evoking 
   a sense of wonder and intrigue. It should include symbolic elements related to the story's content,
    creating a magical and otherworldly atmosphere. The composition should be balanced and aesthetically 
    pleasing, suitable for use as a captivating and memorable illustration on a game card. The image should
    be a single continuous scene, not a collection of separate images.`;
};

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const story = await getStory({ id: params.storyId as string });
  if (!story) throw dvError.notFound("Story not found");
  const { imageUrl } = story;
  if (!imageUrl) {
    const imageKey = `image:${story.id}`;
    const cachedImageUrl = await redis.get(imageKey);
    if (cachedImageUrl) {
      return typedjson({ imageUrl: cachedImageUrl, imageCandidateUrl: null });
    }
    const response = await openaiImageGenerator({ prompt: imagePrompt(story) });
    const imageCandidateUrl = response.data[0].url;
    // debounce the image generation
    imageCandidateUrl && (await redis.setex(imageKey, 3000, imageCandidateUrl));
    return typedjson({ imageCandidateUrl, imageUrl: null });
  }
  return typedjson({ imageUrl, imageCandidateUrl: null });
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const story = await getStory({ id: params.storyId as string });
  if (!story) throw dvError.notFound("Story not found");
  if (story?.imageUrl) {
    //removing the url here will trigger update on the loader.
    await updateImageInStory({ storyId: story.id, imageUrl: null });
    return typedjson({ status: "ok" });
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
    const { data, error } = await supabase.storage.createBucket("images", {
      public: true,
      allowedMimeTypes: ["image/png"],
      fileSizeLimit: "2MB",
    });
    if (error) {
      console.error(error);
      return typedjson({ status: "error" });
    }
  }
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`story/${story.id}.png`, file, { upsert: true });
  if (error) {
    console.error(error);
    return typedjson({ status: "error" });
  }
  const newIMageUrl = data.path;
  await updateImageInStory({ storyId: story.id, imageUrl: newIMageUrl });
};

export default function NewStoryImage() {
  const { revalidate } = useRevalidator();
  const { imageUrl, imageCandidateUrl } = useTypedLoaderData<typeof loader>();
  return (
    <div>
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
