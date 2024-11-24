import { LineEvent } from "./type/lineEvent";
import { callChatGPT } from "./chatGPT/chatgpt";
import { CallChatGPTPayload } from "./type/chatGPTTypes";
import { spreadSheetMethod } from "./spreadSheet/spreadSheetMethod";
import { sendMessage } from "./message/sendMessage";
import { findSpreadsheet } from "./spreadSheet/findSpreadsheet";
import { getValuesFromSpreadsheet } from "./spreadSheet/getValuesFromSpreadsheet";

interface DoGetEvent {
  queryString: string;
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  contextPath: string;
  contentLength: number;
  pathInfo: string;
}

interface DoPostEvent {
  postData: {
    contents: string; // リクエストボディの内容（例: JSON文字列）
    length: number; // リクエストボディのバイト長
    name: string; // データ名（ファイル名など）
    type: string; // MIMEタイプ（例: "application/json"）
  };
  parameter: Record<string, string>; // クエリパラメータの単一値
  parameters: Record<string, string[]>; // クエリパラメータの配列値
}

/**
 * テスト用の関数
 * @param e
 */
function doGet(e: DoGetEvent) {
  console.log("OK");
}

/**
 * 本番用の関数
 * @param e
 */
function doPost(e: DoPostEvent) {
  const lineEvent: LineEvent = JSON.parse(e.postData.contents);
  const event = lineEvent.events[0];
  const request = event.message.text;
  const replyToken = event.replyToken;
  const type = event.source.type;

  let id = "default";

  // typeを判定して、idを取得
  if (type === "user") {
    id = event.source.userId ?? "default";
  } else if (type === "group") {
    id = event.source.groupId ?? "default";
  } else if (type === "room") {
    id = event.source.roomId ?? "default";
  }

  const spreadsheet = findSpreadsheet(id);

  if (typeof spreadsheet === "string") {
    const lineMessage =
      "計算記録が見つかりません。計算を開始したければ、@計算開始 と送信してください。";
    sendMessage(replyToken, lineMessage);
    return;
  }

  // スプシを新規作成
  if (request === "@計算開始") {
    const lineMessage = "計算を開始します。";
    SpreadsheetApp.create(id);
    sendMessage(replyToken, lineMessage);
    return;
  }

  if (request === "@リセット") {
    const sheet = spreadsheet.getSheets()[0];

    // 各シートの内容をすべてクリア（フォーマットは保持）
    sheet.clear();
  }

  if (request === "@計算終了") {
    let messageText = "";
    const valuesMap = getValuesFromSpreadsheet(spreadsheet);
    for (const [key, { value, index }] of valuesMap) {
      messageText += `${value[0]}: ${value[1]}に${value[2]}円支払い \n`;
    }
    sendMessage(replyToken, messageText);
    return;
  }

  const chatGPTResponse = callChatGPT(request);
  const paymentData: CallChatGPTPayload[] = JSON.parse(chatGPTResponse);

  if (Array.isArray(paymentData)) {
    spreadSheetMethod(spreadsheet, paymentData);
  } else {
    spreadSheetMethod(spreadsheet, [paymentData]);
  }

  const messageText =
    "承りました。次の指示をどうぞ。計算を終了したければ @計算終了 と送信してください。";

  sendMessage(replyToken, messageText);
}
