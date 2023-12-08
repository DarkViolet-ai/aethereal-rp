import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";

import styles from "~/css/tailwind.css";
import globalStyles from "~/css/global.css";
import MainBackground from "./components/specialty/mainBackground";
import EntirePageContainer from "./components/buildingBlocks/entirePage";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: globalStyles },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap",
  },
];

export const loader = async ({ request }: DataFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  const response = new Response();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  );

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  let userId = session?.user?.id;
  if (userId === "") {
    userId = undefined;
  }

  return typedjson(
    {
      env,
      session,
      userId,
    },
    {
      headers: response.headers,
    }
  );
};

export type RootLoaderData = typeof loader;

export default function App() {
  const { env, session } = useTypedLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainBackground>
          <EntirePageContainer className="bg-calmVioletCyanGrad rounded-none">
            <Outlet />
          </EntirePageContainer>
        </MainBackground>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
