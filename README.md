# split_the_bill_personal

![DALL·E 2024-11-24 15 53 41 - A cute and friendly character designed for a chatbot context  The character should have big, adorable eyes, a gentle smile, and a soft, round design t](https://github.com/user-attachments/assets/044d6ed9-7361-4321-a102-f7bba8059b3c)

GAS × ChatGPT × SpreadSheet × LINEAPI を使用した自然言語処理での割り勘計算サービスです。

## 開発環境の特徴

このプロジェクトは、GAS のローカルでの開発環境に特化しており、TypeScript での開発、npm パッケージの使用、ローカルから GAS にデプロイが可能です。

GAS へは Claps を使用してデプロイを行なっており、プッシュ時は、TypeScript を JavaScript にビルドし、npm パッケージは rollup というバンドラを使用することで、最終的に全てメインファイルにまとめ、使用することができます。
