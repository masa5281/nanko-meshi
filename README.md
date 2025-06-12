## ■ なんこメシ / 消費カロリー変換アプリ
![key-pc](https://github.com/user-attachments/assets/64543d40-8947-44fd-88ea-d0b5b5ed4a33)

▼ サービスURL<br> 
https://www.nankomeshi.com<br> 

▼ 動作確認用のユーザー情報<br>
Email：pogyomagyu@quicksend.ch<br>
Password：password<br>

▼ Qiitaの紹介記事<br> 
https://qiita.com/maaasaaayk/items/28832ffa80b791f37858

## ■ サービス概要
消費したカロリーを食べ物の個数に換算するアプリ。<br/> 
運動1回分、あるいは累積のカロリー消費量を数値で入力すると、それに相当する「お菓子」や「ジャンクフード」など、
ユーザーが登録した食品に換算して表示します。
例えば、「板チョコ◯個分」「ラーメン◯個分」など身近な食品と比較して視覚的にカロリー消費量を実感できます。
## ■ 開発の背景
開発者自身がダイエット中にスマホアプリで消費カロリーを確認した際、
数値は表示されるものの、「具体的にどれほどの量を消費したのか」が直感的に分かりづらいと感じたのがきっかけです。

消費したカロリーを数値だけでなく、日常的に親しみ深い食べ物に置き換えて可視化することで、
運動の成果をより実感でき、モチベーション向上や食欲のコントロールにもつながるのではないかと考え開発に至りました。
## ■ ターゲット層
ダイエット中の男女全般
## ■ サービスの差別化ポイント
多くのダイエット系のアプリでは「摂取カロリーを管理する」ことに特化しており、
「消費カロリーそのものに焦点を当てた」アプリは見当たらなかった。<br/> 
本サービスは単に数値としてのカロリーではなくその"実感"に着目した点で差別化を図っています。
## ■ 実装機能
- ユーザー登録
- ログイン・ログアウト
- パスワード再設定
- カロリー入力機能（手動 / Mets）
- カロリー換算機能
- 食品登録機能
- 食品一覧機能
- 食品お気に入り機能
- 棒グラフ機能（月 / 週）
- プロフィール編集機能
- X(Twitter)シェア機能
## ■ サービス利用のイメージ
### メイン機能（カロリー換算の流れ）
|1.食品登録|2-1.カロリー入力（手動）|2-2.カロリー入力（Mets）
|---|---|---|
|![food-register](https://github.com/user-attachments/assets/dbd0b62d-c233-473d-8dff-e731445b62f5)|![food-conversion](https://github.com/user-attachments/assets/a323ae6d-6f0b-4609-ac50-67e2ad1325db)|![food-conversion](https://github.com/user-attachments/assets/e36be1e8-9d25-4b1f-9727-972390b7092e)|
|自分がよく食べる食品を登録して、個数換算の対象にできます。|運動による消費カロリーと日付を入力。|カロリーが不明な場合はMETsから推定値を算出できます。|
### サブ機能
|グラフ機能|お気に入り機能|
|---|---|
|![graph](https://github.com/user-attachments/assets/7a2ea467-825a-42bf-a413-6e0e0bf98743)|![favorite](https://github.com/user-attachments/assets/bb5d813c-90dd-4219-a2d6-98239fd062ef)|
|月、週ごとの消費カロリーをグラフで表示します。週グラフには「食品個数換算ボタン」があり、各日の換算結果を確認できます。|他のユーザーが登録している食品をお気に入り登録して、個数換算の対象にできます。|
## ■ 使用技術
|カテゴリー|使用技術|
|---|---|
|フロントエンド|React 18.3.1<br/>Tailwind CSS 3.4.17|
|バックエンド|Ruby 3.4.1<br/>Ruby on Rails 7.2.2.1（APIモード）|
|インフラ|AWS / Nginx|
|DB|PostgreSQL|
|認証|Firebase Authentication|
|環境構築|Docker|
|CI/CD|GitHub Actions|
|その他（フロントエンド）|ESLint / axios / recharts / motion / flowbite-react|
|その他（バックエンド）|RuboCop / CarrierWave / jwt / active_model_serializers|
## ■ UIフレームワーク
![UIフレームワーク](https://github.com/user-attachments/assets/a906c2c8-aa99-48ff-b672-31e1102bee9b)
## ■ ER図
![ER図](https://github.com/user-attachments/assets/fd8c56f4-9f7d-48c2-a6af-9d49b743bf2e)
## ■ インフラ構成図
![インフラ図](https://github.com/user-attachments/assets/287ec27f-e507-415a-b4cd-b27e5d40d743)

