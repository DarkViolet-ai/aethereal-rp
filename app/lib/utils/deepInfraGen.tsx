const DEEP_INFRA_BASE = "https://api.deepinfra.com/v1/" as const;
const DEEP_INFRA_API_KEY = process.env.DEEP_INFRA_API_KEY;

type DeepInfraTextGenerationOut = {
  results: GeneratedText[];
  num_tokens?: number;
  num_input_tokens?: number;
  request_id?: string;
  inference_status?: Status;
};

type GeneratedText = {
  generated_text: string;
};

type Status = {
  status?: string;
  runtime_ms?: number;
  cost: number;
  tokens_generated?: number;
  tokens_input?: number;
};
export type DeepInfraGenInput = {
  systemPrompt: string;
  userPrompt: string;
  maxNewtokens?: number;
  apiBase?: string;
  apiKey?: string;
  model?: string;
  temperature?: number;
  topP?: number;
  repititionPenalty?: number;
  stopSequences?: string[];
  topK?: number;
  numResponses?: number;
  stream?: boolean;
};

export const deepInfraGen = async ({
  systemPrompt,
  userPrompt,
  maxNewtokens = 100,
  apiBase = DEEP_INFRA_BASE,
  apiKey = DEEP_INFRA_API_KEY,
  model = "mistralai/Mixtral-8x7B-Instruct-v0.1",
  temperature,
  topP,
  repititionPenalty,
  stopSequences,
  topK,
  numResponses,
  stream,
}: DeepInfraGenInput) => {
  const uri = apiBase + model;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const body = {
    input: deepInfraMakeFullPrompt(systemPrompt, userPrompt),
    max_new_tokens: maxNewtokens,
    temperature,
    top_p: topP,
    repitition_penalty: repititionPenalty,
    stop_sequences: stopSequences,
    top_k: topK,
    num_responses: numResponses,
    stream,
  };
  const response = await fetch(uri, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  console.log(response);

  return (await response.json()) as DeepInfraTextGenerationOut;
};

export const deepInfraMakeSysPrompt = (systemPrompt: string) => {
  return `<<SYS>>\n${systemPrompt}\n<<SYS>>\n`;
};

export const deepInfraMakeFullPrompt = (
  systemPrompt: string,
  userPrompt: string
) => {
  return `[INST]${deepInfraMakeSysPrompt(systemPrompt)}${userPrompt}[/INST]`;
};
