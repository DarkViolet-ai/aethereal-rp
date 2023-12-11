import { useEventSource } from "remix-utils/sse/react";

export default function useStatusStream(storyId: string) {
  const path = `/playground/${storyId}/stream-status`;
  const data = useEventSource(path);
  return data;
}
