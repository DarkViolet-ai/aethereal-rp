import { deepInfraGen } from "../utils/deepInfraGen";

export const deepInfraCharacterGenerator = async (
  systemPrompt: string,
  input: string
) => {
  const response = await deepInfraGen({
    userPrompt: input,
    systemPrompt,
    temperature: 1.2,
    maxNewtokens: 500,
  });
  return response.results[0].generated_text;
};

export const deepInfraStoryGenerator = async (
  systemPrompt: string,
  input: string
) => {
  const response = await deepInfraGen({
    userPrompt: input,
    systemPrompt,
    temperature: 0.9,
    maxNewtokens: 2500,
  });
  return response.results[0].generated_text;
};
