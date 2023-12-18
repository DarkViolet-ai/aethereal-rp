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
You will take the input from the character named ${
    character.name
  } and edit it to make it flow with the rest of the story, converting the voice to third person.
Here is the content of the story: ${story.content.slice(-maxLength)}
Do not include the content of the story in your response.
A coauthor has just added new-input below to the story.  This is the input from the character named
${character.name}.
Please edit the input below to make it flow with the rest of the story above in the best possible way.  You are a brilliant
writer and the author needs your help to make this story great. Edit the newinput to make it flow with the rest
of the story.  Conver the voice into third person even if the user spoke in first person.  
Make sure to add in any punctuation that is needed.  You can also add in new sentences and words
as is necessary to meet the objective.`;
