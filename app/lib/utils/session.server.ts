import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { z } from "zod";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { getUser } from "~/lib/db/user.server";
import { dvError } from "~/lib/utils/dvError";

const envSchema = z.object({
  SUPABASE_ANON_KEY: z.string().min(1, "appwrite endpoint is required"),
  SUPABASE_URL: z.string().min(1, "appwrite project ID is required"),
  SUPABASE_SERVICE_KEY: z.string().min(1, "appwrite API key is required"),
  SESSION_SECRET: z.string().min(1, "appwrite API key is required"),
});

const envVars = process.env;
const USER_SESSION_KEY = "userId";

const validatedEnvVars = envSchema.parse(envVars);

export const {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  SESSION_SECRET,
} = validatedEnvVars;

export const newSupabaseClient = (request: Request) => {
  const response = new Response();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  );
  return { supabase, response };
};

export async function getSession(request: Request) {
  const { supabase } = newSupabaseClient(request);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  // assuming we don't need response headers if no mutations are happening
  return session;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: true,
  },
});

export async function getUserId(request: Request) {
  const session = await getSession(request);
  return session?.user?.id;
}

export async function requireUserId(
  request: Request,
  from: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  // console.log("requireUserId", userId);
  if (!userId) {
    const searchParams =
      from !== "/logout" ? new URLSearchParams([["from", from]]) : "";
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(
  request: Request,
  from: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["from", from]]);
    throw redirect(`/login?${searchParams}`);
  }

  const user = await getUser(userId);
  if (!user) {
    throw dvError.forbidden("user not found");
  }
  return user;
}
