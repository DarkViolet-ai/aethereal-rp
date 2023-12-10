import { Stories } from "~/css/styles";
import StoryPanel from "./components/storyPanel";

export default function StoryId() {
  return <StoryPanel story={Stories[0]} />;
}
