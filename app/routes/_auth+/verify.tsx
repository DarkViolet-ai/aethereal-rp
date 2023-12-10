import { DataFunctionArgs } from "@remix-run/node";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "~/lib/utils/session.server";
import { redirect } from "remix-typedjson";
import { createUser } from "~/lib/db/db.server";

export const loader = async ({ request }: DataFunctionArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabaseClient = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      request,
      response,
    });
    const result = await supabaseClient.auth.exchangeCodeForSession(code);
    // console.log("result", result);
    const {
      data: { session },
      error,
    } = result;
    // pull the username out of the session user_metadata if it exists
    const username = session?.user?.user_metadata?.username;
    const userId = session?.user?.id;
    if (!userId || !username) {
      throw new Error("userId or username not found");
    }
    const newUser = await createUser({ id: userId, name: username });
    return redirect("/", {
      headers: response.headers,
    });
  }

  return redirect("/", {
    headers: response.headers,
  });
};
