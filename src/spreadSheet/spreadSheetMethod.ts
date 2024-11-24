import { CallChatGPTPayload } from "../type/chatGPTTypes";

/**
 * 誰が誰にいくら支払うのかを計算し、スプシに書き込むメソッド。AさんがBさんに奢る場合、AさんがBさんに奢られていたらその分奢る額を差し引いて、Bさんの奢り額は0とする。
 *
 * しかし、Bさんの方が多く奢っている場合は逆に、Bさんの奢り額からAさんの奢り額を差し引く。
 * @param spreadsheet
 * @param paymentData
 */
export function spreadSheetMethod(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  paymentData: CallChatGPTPayload[]
) {
  const sheet = spreadsheet.getSheets()[0];
  // A列とB列のデータを全て取得
  const range = sheet.getRange(1, 1, sheet.getLastRow(), 3); // A1からC列の最終行まで取得
  const values = range.getValues(); // 二次元配列で取得される

  // A列とB列の組み合わせをキーにして、Mapを作成
  const valuesMap = new Map(
    values.map((value, index) => [value[0] + value[1], { value, index }])
  );

  // 新しい行を追加する関数
  const createCell = (From: string, To: string, Money: string) => {
    const lastRow = sheet.getLastRow() + 1; // 次に追加する行番号
    sheet.getRange(lastRow, 1).setValue(From); // A列
    sheet.getRange(lastRow, 2).setValue(To); // B列
    sheet.getRange(lastRow, 3).setValue(Money); // C列
    valuesMap.set(From + To, { value: [From, To, Money], index: lastRow - 1 });
  };

  paymentData.forEach((el) => {
    const pay = valuesMap.get(el.From + el.To); // 奢った記録
    const paid = valuesMap.get(el.To + el.From); // 奢られた記録

    // 奢った記録も奢られた記録も存在しない場合、新しい行を追加
    if (!pay && !paid) {
      createCell(el.From, el.To, el.Money);
      return; // 新しい行を追加したら次のループに進む
    }

    // 奢った記録が存在する場合、値を更新
    if (pay) {
      const currentMoney = Number(pay.value[2]) || 0; // 既存の値がない場合は 0 とする
      const newMoney = currentMoney + Number(el.Money);

      // 値を更新
      sheet.getRange(pay.index + 1, 3).setValue(newMoney);
      pay.value[2] = newMoney;
      valuesMap.set(el.From + el.To, pay);
    }

    // 奢られた記録が存在する場合
    if (paid) {
      const payAmount = pay ? Number(pay.value[2]) : Number(el.Money);
      const paidAmount = Number(paid.value[2]);

      // 奢った額と奢られた額が同じ場合は相殺する
      if (payAmount === paidAmount) {
        sheet.getRange(paid.index + 1, 1, 1, 3).clear();
        valuesMap.delete(el.To + el.From);

        if (pay) {
          sheet.getRange(pay.index + 1, 1, 1, 3).clear();
          valuesMap.delete(el.From + el.To);
        }
        return;
      }

      // 多く奢った方から差し引き、多い方を更新する
      if (payAmount > paidAmount) {
        if (pay) {
          const newMoney = payAmount - paidAmount;
          sheet.getRange(pay.index + 1, 3).setValue(newMoney);
          pay.value[2] = newMoney;
          valuesMap.set(el.From + el.To, pay);

          // 奢られた記録を削除
          sheet.getRange(paid.index + 1, 1, 1, 3).clear();
          valuesMap.delete(el.To + el.From);
        }
      } else {
        const newMoney = paidAmount - payAmount;
        sheet.getRange(paid.index + 1, 3).setValue(newMoney);
        paid.value[2] = newMoney;
        valuesMap.set(el.To + el.From, paid);

        if (pay) {
          sheet.getRange(pay.index + 1, 1, 1, 3).clear();
          valuesMap.delete(el.From + el.To);
        }
      }
    }
  });
}
