import OpenAI from "openai";
const openai = new OpenAI();

export const openaiStoryGenerator = async (
  systemPrompt: string,
  input: string
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    model: "gpt-4-1106-preview",
    max_tokens: 2500,
    response_format: {
      type: "json_object",
    },
  });
  return completion.choices[0].message.content || "";
};

export const openaiCharacterGenerator = async (
  systemPrompt: string,
  input: string
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    model: "gpt-3.5-turbo-1106",
    temperature: 1.2,
    max_tokens: 500,
  });
  return completion.choices[0].message.content || "";
};

export const openaiImageGenerator = async ({ prompt }: { prompt: string }) => {
  const imageUrl = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
  });
  return imageUrl;
};
