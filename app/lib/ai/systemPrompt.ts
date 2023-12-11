import { Narrator } from "~/lib/db/narrator.server";
import { StoryData } from "~/lib/db/story.server";
import { dvError } from "../utils/dvError";

export const buildSystemPrompt = async ({
  story,
  scenario,
}: {
  story: StoryData;
  scenario: "integrate" | "narrate" | "initialize";
}) => {
  const narrator = story.narrator as Narrator;
  console.log("narrator", narrator);
  const narratorInstructions =
    narrator?.instructions && narrator.instructions[scenario];
  const storySummary = story.summary;
  const storyTitle = story.title;
  if (scenario !== "initialize") {
    const characters = story.characters.reduce((acc, curr) => {
      const { name, description } = curr;
      if (!name) throw dvError.badRequest("Character must have a name");
      acc[name] = description;
      return acc;
    }, {} as Record<string, string | null>);

    const characterString = JSON.stringify({ characters });

    const systemPrompt = `${narratorInstructions} title:${storyTitle}
   \n summary: ${storySummary}\n ${characterString}\n
   ${story.content}`;

    return systemPrompt;
  } else {
    const systemPrompt = `${narratorInstructions} title:${storyTitle}
   \n summary: ${storySummary}\n`;

    return systemPrompt;
  }
};
