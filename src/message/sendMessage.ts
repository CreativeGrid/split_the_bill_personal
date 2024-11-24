const propetiesService = PropertiesService;
const scriptProperties = propetiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty("LINE_CHANNEL_ACCESS_TOKEN");

export function sendMessage(replyToken: string, message: string) {
  const url = "https://api.line.me/v2/bot/message/reply";

  const payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: message,
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
