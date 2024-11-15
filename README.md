# split_the_bill_personal
GAS × ChatGPT × SpreadSheet × LINEAPIを使用した自然言語処理での割り勘計算サービスです。
## 開発環境の特徴
このプロジェクトは、GASのローカルでの開発環境に特化しており、TypeScriptでの開発、npmパッケージの使用、ローカルからGASにデプロイが可能です。

GASへはClapsを使用してデプロイを行なっており、プッシュ時は、TypeScriptをJavaScriptにビルドし、npmパッケージはrollupというバンドラを使用することで、最終的に全てメインファイルにまとめ、使用することができます。
