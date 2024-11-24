export function findSpreadsheet(
  spreadsheetName: string
): GoogleAppsScript.Spreadsheet.Spreadsheet | string {
  Logger.log(spreadsheetName);
  const files = DriveApp.getFilesByName(spreadsheetName);

  let spreadsheet;

  // ファイルが見つかったかどうかを確認
  if (files.hasNext()) {
    const file = files.next();
    spreadsheet = SpreadsheetApp.openById(file.getId());
    Logger.log("既存のスプレッドシートを使用します: " + spreadsheet.getUrl());
    return spreadsheet;
  } else {
    return "not found";
  }
}
