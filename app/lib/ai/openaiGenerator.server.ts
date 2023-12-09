import OpenAI from "openai";
const openai = new OpenAI();

export const openaiGenerator = async (prompt: string, input: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: input },
    ],
    model: "gpt-4-1106-preview",
  });

  return completion.choices[0].message.content;
};
