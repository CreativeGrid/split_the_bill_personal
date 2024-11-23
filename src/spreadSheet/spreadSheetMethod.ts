import { CallChatGPTPayload } from "../type/chatGPTTypes";

export function spreadSheetMethod(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  paymentData: CallChatGPTPayload[]
) {
  const sheet = spreadsheet.getSheets()[0];
  // A列とB列のデータを全て取得
  const range = sheet.getRange(1, 1, sheet.getLastRow(), 3); // A1からC列の最終行まで取得
  const values = range.getValues(); // 二次元配列で取得される

  paymentData.forEach((el) => {
    let found = false;

    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === el.From && values[i][1] === el.To) {
        // 該当する組み合わせが見つかった場合、その行の Money を更新する
        const moneyCell = sheet.getRange(i + 1, 3); // 行は1から始まるので i + 1
        const currentMoney = Number(values[i][2]) || 0; // 既存の値がない場合は 0 とする
        moneyCell.setValue(currentMoney + el.Money);
        found = true;
        break;
      }
    }

    if (!found) {
      // 該当する組み合わせが見つからなかった場合、新しい行を追加
      const lastRow = sheet.getLastRow() + 1; // 次に追加する行番号
      sheet.getRange(lastRow, 1).setValue(el.From); // A列
      sheet.getRange(lastRow, 2).setValue(el.To); // B列
      sheet.getRange(lastRow, 3).setValue(el.Money); // C列
    }
  });
}
