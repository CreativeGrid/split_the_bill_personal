interface Payload {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
}

interface GPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    text: string;
    index: number;
    logprobs: any; // `null` またはオブジェクトになることが多い
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

function callChatGPT(prompt: string): string {
  const propetiesService = PropertiesService;
  const scriptProperties = propetiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty("OPENAI_API_KEY");

  const url = "https://api.openai.com/v1/completions";

  const payload: Payload = {
    model: "gpt-4",
    prompt: prompt,
    max_tokens: 150,
    temperature: 0.7,
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(url, options);

    const responseData: GPTResponse = JSON.parse(response.getContentText());

    const gptResponse = responseData.choices[0].text.trim();
    return gptResponse;
  } catch (error) {
    Logger.log("Error: " + error);
    return "APIリクエストに失敗しました。";
  }
}

/**
 * ChatGPTに質問して、そのレスポンスを受け取るための関数。
 * @param prompt
 * @returns
 */
export function testChatGPT() {
  const prompt = "これから全てのレスポンスはjsonで返して欲しいです。";
  const response = callChatGPT(prompt);
  Logger.log(response);
}
