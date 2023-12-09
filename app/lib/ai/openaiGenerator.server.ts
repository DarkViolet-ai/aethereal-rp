import OpenAI from "openai";
const openai = new OpenAI();

export const openaiGenerator = async (systemPrompt: string, input: string) => {
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
