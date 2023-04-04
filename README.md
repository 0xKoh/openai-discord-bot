# ChatGPT Discord Bot
Discord Botに関する知見がある前提で解説していきます。
このBotはOpenAIのAPIを使用して、ChatGPT3.5と対話することのできるBotです。

## 利用方法
まずOpenAIにてAPI keyを取得して ``config.json`` へ入力してください。
その他、BotのクライアントIDとトークンも入力してください。
```json
{
    "token": "DiscordBot Token",
    "clientId": "DiscordBot ClientID",
    "openaiKey": "OpenAI API key"
}
```

必要に応じて、``data.json`` の配列オブジェクトの最初の要素 ``content``へpromptを入力して、GPT3.5をチューニングしてください。
```json
[
    {"role":"system","content":"ここへpromptを記述してください"}
]
```
この``data.json``へ対話のデータが全て保存されます。
ChatGPT3.5はDiscordのユーザIDから人を判別し、返答することができます。


各種Botの設定が終われば、あとは`npm run build`でdistファイルが生成されます。あとは`npm start`dist上のJSが実行され、Botを稼働させることができます。