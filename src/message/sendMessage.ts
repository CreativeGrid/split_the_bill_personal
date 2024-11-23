const propetiesService = PropertiesService;
const scriptProperties = propetiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty("LINE_CHANNEL_ACCESS_TOKEN");

export function sendMessage(
  replyToken: string,
  valuesMap: Map<string, { value: any[]; index: number }>
) {
  const url = "https://api.line.me/v2/bot/message/reply";

  let messageText = "";
  for (const [key, { value, index }] of valuesMap) {
    messageText += `${value[0]}: ${value[1]}に${value[2]}円支払い \n`;
  }

  const payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: `${messageText}`,
      },
    ],
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
    payload: JSON.stringify(payload),
  };

  // ----- lineメッセージ送信 -----
  UrlFetchApp.fetch(url, options);
}
