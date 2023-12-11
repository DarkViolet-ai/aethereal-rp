import { useEventSource } from "remix-utils/sse/react";

export default function useStatusStream(storyId: string) {
  const path = `/playground/stream-status/${storyId}`;
  const data = useEventSource(path);
  return data;
}
