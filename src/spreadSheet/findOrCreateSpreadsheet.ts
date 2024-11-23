export function findOrCreateSpreadsheet(
  spreadsheetName: string
): GoogleAppsScript.Spreadsheet.Spreadsheet {
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
  } else {
    // 見つからなかった場合、新しいスプレッドシートを作成
    spreadsheet = SpreadsheetApp.create(spreadsheetName);
    // const sheet = spreadsheet.getSheets()[0];
    // // A1 セルに 'from' を設定
    // sheet.getRange("A1").setValue("from");
    // // B1 セルに 'to' を設定
    // sheet.getRange("B1").setValue("to");
    // // C1 セルに 'money' を設定
    // sheet.getRange("C1").setValue("money");
    // // E1 セルに 'name' を設定
    // sheet.getRange("E1").setValue("name");
    // // F1 セルに 'balance' を設定（収支という意味）
    // sheet.getRange("F1").setValue("balance");

    Logger.log("新しいスプレッドシートを作成しました: " + spreadsheet.getUrl());
  }

  return spreadsheet;
}
