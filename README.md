# split_the_bill_personal
GAS × ChatGPT × SpreadSheet × LINEAPIで自然言語処理での割り勘計算サービスです。
## 開発環境の特徴
このプロジェクトは、GASのローカルでの開発環境に特化しており、TypeScriptでの開発、npmパッケージの使用、ローカルからGASにデプロイが可能です。

GASへのプッシュ時は、TypeScriptをJavaScriptにビルドし、npmパッケージはrollupというバンドラを使用することで、最終的にメインファイルにまとめ、使用することができます。
