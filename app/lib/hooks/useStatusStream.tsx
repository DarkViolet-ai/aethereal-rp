import { useEventSource } from "remix-utils/sse/react";

export default function useStatusStream(storyId: string | null | undefined) {
  const path = `/story/stream-status/${storyId || ""}`;
  const data = useEventSource(path);
  return data;
}
