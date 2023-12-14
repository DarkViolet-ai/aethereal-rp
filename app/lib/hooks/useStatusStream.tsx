import { useEventSource } from "remix-utils/sse/react";

export default function useStatusStream(storyId: string) {
  const path = `/story/stream-status/${storyId}`;
  const data = useEventSource(path);
  return data;
}
