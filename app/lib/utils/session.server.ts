import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { z } from "zod";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { getUser } from "~/lib/siteModel/getUser.server";
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

export async function getSessionDbUser(request: Request) {
  const session = await getSession(request);
  const userId = session?.user?.id;
  const username = session?.user?.user_metadata?.username;
  return { username, userId };
}

// Use the validated environment variables
// export const adminClient = new Client()
//   .setEndpoint(APPWRITE_ENDPOINT)
//   .setProject(APPWRITE_PROJECT_ID)
//   .setKey(APPWRITE_API_KEY);

// const users = new Users(adminClient);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const userClient: Client | null = null;

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

// export async function getUsername(request: Request) {
//   const session = await getSession(request);
//   const username = session.get("username");
//   return username;
// }

// export async function getUser(request: Request) {
//   const session = await getSession(request);
//   const userId = session.get(USER_SESSION_KEY);
//   const username = session.get("username");
//   return { username, userId };
// }

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

  const user = await getUser({ id: userId });
  if (!user) {
    throw dvError.forbidden("user not found");
  }
  return user;
}

// export async function requireUserTeam(
//   request: Request,
//   teamId: string,
//   from: string = new URL(request.url).pathname
// ) {
//   const teams = new Teams(adminClient);
//   try {
//     const adminsTeam = await teams.get("admins");
//     if (!adminsTeam) {
//       throw new Error("admins team not found");
//     }
//   } catch (e) {
//     teams.create("admins", "admins");
//   }

//   const userId = await getUserId(request);
//   // console.log("userId", userId);
//   if (userId) {
//     const { memberships } = await users.listMemberships(userId);
//     // console.log("memberships", memberships);
//     if (memberships.map((membership) => membership.teamId).includes(teamId)) {
//       return userId;
//     } else {
//       // todo: change this to throw an error that the error boundary will catch
//       throw redirect(`/403`);
//     }
//   }
//   const searchParams = new URLSearchParams([["from", from]]);
//   throw redirect(`/login?${searchParams}`);
// }

// export async function getSession(request: Request) {
//   const cookie = request.headers.get("Cookie");
//   return sessionStorage.getSession(cookie);
// }

// export async function createUserSession({
//   request,
//   appwriteSessionId,
//   userId,
//   redirectTo,
// }: {
//   request: Request;
//   appwriteSessionId: string;
//   userId: string;
//   redirectTo: string;
// }) {
//   // console.log("createUserSession", appwriteSessionId, userId, redirectTo);
//   const session = await getSession(request);
//   session.set("username", username);
//   session.set(USER_SESSION_KEY, userId);
//   session.set("appwriteSessionId", appwriteSessionId);
//   return redirect(redirectTo, {
//     headers: {
//       "Set-Cookie": await sessionStorage.commitSession(session, {
//         maxAge: 60 * 60 * 24 * 365,
//       }),
//     },
//   });
// }
/*
export async function getJwt(request : Request) {
  const session = await getSession(request);
  const jwtExpiration = session.get("jwtExpiration");
  const appwriteJwt = session.get("appwriteJwt");
  return { appwriteJwt, jwtExpiration };
}

export async function setJwt(request : Request, appwriteJwt : string) {
  const session = await getSession(request);
  session.set("appwriteJwt", appwriteJwt);
  session.set("jwtExpiration", Date.now() + 1000 * 60 * 13);
  return await sessionStorage.commitSession(session);
}

export async function requireJwt(request : Request) {
  const jwt = await getJwt(request);
  console.log("requireJwt ", jwt);
  if (!jwt) {
    const currentPath = new URL(request.url).pathname;

    return redirect("/refreshtoken?from=" + currentPath);
  }
  return jwt;
}
*/
// export async function logoutServer(request: Request) {
//   const session = await getSession(request);
//   return redirect("/", {
//     headers: {
//       "Set-Cookie": await sessionStorage.destroySession(session),
//     },
//   });
// }
