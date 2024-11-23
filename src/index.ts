import { LineEvent } from "./type/lineEvent";
import { callChatGPT } from "./chatGPT/chatgpt";
import { findOrCreateSpreadsheet } from "./spreadSheet/findOrCreateSpreadsheet";
import { CallChatGPTPayload } from "./type/chatGPTTypes";
import { spreadSheetMethod } from "./spreadSheet/spreadSheetMethod";
import { sendMessage } from "./message/sendMessage";

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
  const chatGPTResponse = callChatGPT(request);
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

  const spreadsheet = findOrCreateSpreadsheet(id);

  const paymentData: CallChatGPTPayload[] = JSON.parse(chatGPTResponse);

  let valuesMap;

  if (Array.isArray(paymentData)) {
    valuesMap = spreadSheetMethod(spreadsheet, paymentData);
  } else {
    valuesMap = spreadSheetMethod(spreadsheet, [paymentData]);
  }

  sendMessage(replyToken, valuesMap);
}
