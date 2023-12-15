import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useState } from "react";

const thumbnailSize = 150;
const bucketName = "images";
const filePath = `public/`;

const imageSizes = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 1024,
};

export default function useSizedImage(
  contentId: string | null | undefined,
  size: keyof typeof imageSizes
) {
  const filename = `${contentId}.png`;
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();
  if (!supabase || !contentId) return null;
  const imageUrl = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath + filename, {
      transform: { width: imageSizes[size], height: imageSizes[size] },
    }).data.publicUrl;
  // console.log("thumbnail", imageUrl);
  return imageUrl;
}
//https://sodvgvqfukkmhxsoyfbs.supabase.co/storage/v1/object/public/images/public/f0f614de-2e0f-468e-93e5-f18919874976.png
