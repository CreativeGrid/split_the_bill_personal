# split_the_bill_personal

![DALL·E 2024-11-24 15 53 41 - A cute and friendly character designed for a chatbot context  The character should have big, adorable eyes, a gentle smile, and a soft, round design t](https://github.com/user-attachments/assets/044d6ed9-7361-4321-a102-f7bba8059b3c)

誰が誰にいくら払ったかを正確に記憶して、最終的に誰が誰にいくら払えばいいのかを計算できるLINE BOTです！友達追加は以下のQRからよろしくお願いします！

![スクリーンショット 2024-11-24 16 09 48](https://github.com/user-attachments/assets/ff31b217-bc57-4538-a271-8803e0a06d00)



## 開発背景及び課題
複数人の友達同士で旅行に行く機会が多々あり、誰が誰にいくら払ったのかを旅行の最後に計算するのはとても面倒であり、最終的になあなあになりがちだった。



## 課題解決
誰かが誰かにものを購入したり、飯代を支払う毎にLINEbotに記録させていくことで、最終的に誰が誰にいくら払えばいいのかが簡単に計算できるのではないかと考えた。



## コマンド一覧

| Command | Description |
| --- | --- |
| @計算開始 | 誰が誰にいくら払ったのかという情報の記録を開始する |
| @リセット | 記録のリセット |
| @計算終了 | 記録を終了し、計算結果を全て出力する |



## 使用例
![S__70484070](https://github.com/user-attachments/assets/a4d4d8cc-3bf2-43c4-a6ad-c047bf0c630c)



## 今後の展望
自然言語処理をより発展させ、レシートを撮影して送信することで記録できたり、決済システムと連携して記録できたりしたら、さらなるユーザビリティーの向上が期待できるのではないかと考えている。



## バージョン
現在バージョン25.0でまだベータ版であるため、バグが発生する可能性があります。ご了承ください。



## 開発環境の特徴

このプロジェクトは、GAS のローカルでの開発環境に特化しており、ローカルでTypeScript での開発、npm パッケージの使用、ローカルから GAS にデプロイが可能です。

GAS へは Claps を使用してデプロイを行なっており、プッシュ時は、TypeScript を JavaScript にビルドし、npm パッケージや他ファイルは rollup というバンドラを使用することで、最終的に全てメインファイルにまとめ、使用することができます。
