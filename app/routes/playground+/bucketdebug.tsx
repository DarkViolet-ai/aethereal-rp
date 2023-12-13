import { DataFunctionArgs } from "@remix-run/node";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { typedjson } from "remix-typedjson";

const imageUrl = "http://localhost:3000/images/core/aetherealLogo.png";

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const response = new Response();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  );

  const imageData = await fetch(imageUrl);
  // convert imageData into a file buffer that can be uploaded with supabase.storage.from().upload()
  const buffer = await imageData.arrayBuffer();
  const file = new File([buffer], "image.png", { type: "image/png" });

  const { data: bucketData, error: bucketError } =
    await supabase.storage.getBucket("images");
  if (bucketError) {
    console.error(bucketError);
  }
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/testing.png`, file, { upsert: true });
  if (error) {
    console.error(error);
    return typedjson({ status: "error" });
  }

  const newIMageUrl = supabase.storage
    .from("images")
    .getPublicUrl("public/testing.png");

  console.log(data);
  return typedjson({ data, newIMageUrl });
};
