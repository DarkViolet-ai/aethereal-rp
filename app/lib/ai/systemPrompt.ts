import { Narrator, StoryContent } from "../db/db.server";
import { dvError } from "../utils/dvError";

export const buildSystemPrompt = async ({
  story,
  scenario,
}: {
  story: StoryContent;
  scenario: "integrate" | "narrate" | "initialize";
}) => {
  const narrator = story.narrator as Narrator;
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
