import { characterImageLoader } from "~/routes/playground+/image-create.$imageType.$id";
import { StoryCharacter } from "../db/character.server";
import { StoryData } from "../db/story.server";

export const editorInstructions = ({
  character,
  story,
  maxLength = 14000,
}: {
  character: StoryCharacter;
  story: StoryData;
  maxLength?: number;
}) =>
  `You helping to create the story ${story.title}.
Story summary: ${story.summary}
Here is the content of the story: ${story.content.slice(-maxLength)}
A coauthor has just added new-input below to the story.  The subject of this is the character 
${character.name}.
Please edit this input to make it flow with the rest of the story in the best possible way.  You are a brilliant
writer and the author needs your help to make this story great. Edit the new-input to make it flow with the rest
of the story.  Make sure to add in any punctuation that is needed.  You can also add in new sentences and words
as is necessary to meet the objective. new-input follows:`;
