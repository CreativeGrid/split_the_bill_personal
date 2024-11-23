import { GPTResponse, Payload } from "../type/chatGPTTypes";

/**
 * ChatGPTに質問して、そのレスポンスを受け取るための関数。
 * @param prompt
 * @returns
 */
export function callChatGPT(prompt: string): string {
  const propetiesService = PropertiesService;
  const scriptProperties = propetiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty("OPENAI_API_KEY");

  const url = "https://api.openai.com/v1/chat/completions";

  const payload: Payload = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "Please respond in JSON format at all times. The response should indicate who (From) paid how much (Money) to whom (To) in JSON format. If the names are provided in Japanese, please use them as they are without translation.",
      },
      { role: "user", content: prompt },
    ],
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
    muteHttpExceptions: true, // エラーレスポンスを取得
  };

  try {
    const response = UrlFetchApp.fetch(url, options);

    const responseData: GPTResponse = JSON.parse(response.getContentText());

    const gptResponse = responseData.choices[0].message.content.trim();

    Logger.log(gptResponse);
    return gptResponse;
  } catch (error) {
    Logger.log("Error: " + error);
    return "APIリクエストに失敗しました。";
  }
}
