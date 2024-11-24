export function getValuesFromSpreadsheet(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
) {
  const sheet = spreadsheet.getSheets()[0];
  // A列とB列のデータを全て取得
  const range = sheet.getRange(1, 1, sheet.getLastRow(), 3);
  const values = range.getValues();

  // A列とB列の組み合わせをキーにして、Mapを作成
  const valuesMap = new Map(
    values.map((value, index) => [value[0] + value[1], { value, index }])
  );

  return valuesMap;
}
