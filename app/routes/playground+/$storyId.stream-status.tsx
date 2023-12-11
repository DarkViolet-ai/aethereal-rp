import type { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { emitter } from "~/lib/utils/emitter.server";
import { dvEvent, dvEventNames } from "~/lib/events/dvEvents";
import { getUserId } from "~/lib/utils/session.server";
import { submitLog } from "~/lib/queue/queues";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const storyId = params.storyId as string;
  const userId = await getUserId(request);
  //return { userId };
  return eventStream(request.signal, (send) => {
    const handle = (statusMessage: string) => {
      send({
        data: String(statusMessage),
      });
    };

    storyId && emitter.addListener(dvEventNames.status(storyId), handle);

    return () => {
      // console.log("shutting down event stream: " + eventName);
      storyId && emitter.removeListener(dvEventNames.status(storyId), handle);
    };
  });
}
