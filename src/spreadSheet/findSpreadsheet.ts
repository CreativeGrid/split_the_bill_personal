import { sendMessage } from "../message/sendMessage";

export function findSpreadsheet(
  spreadsheetName: string
): GoogleAppsScript.Spreadsheet.Spreadsheet | string {
  Logger.log(spreadsheetName);
  // DriveAppを使って指定された名前のスプレッドシートを検索
  const files = DriveApp.getFilesByName(spreadsheetName);

  let spreadsheet;

  // ファイルが見つかったかどうかを確認
  if (files.hasNext()) {
    // 見つかった場合、そのスプレッドシートを取得
    const file = files.next();
    spreadsheet = SpreadsheetApp.openById(file.getId());
    Logger.log("既存のスプレッドシートを使用します: " + spreadsheet.getUrl());
    return spreadsheet;
  } else {
    return "not found";
  }
}
