import { type DataFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import {
  useLoaderData,
  useOutletContext,
  useRevalidator,
} from "@remix-run/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUserId } from "~/lib/utils/session.server";

export const loader = async ({ request }: DataFunctionArgs) => {
  const userId = await requireUserId(request);
  return { userId };
};

export default function Logout() {
  const { userId } = useLoaderData<{ userId: string }>();
  const revalidator = useRevalidator();
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();

  useEffect(() => {
    if (userId) {
      supabase.auth.signOut().then(({ error }) => {
        if (error) {
          console.log(error);
        }
        console.log("we are logging out now, redirecting to login");
        revalidator.revalidate();
      });
    }
  }, [userId, supabase.auth, revalidator]);
  return <div>Logging out...</div>;
}
