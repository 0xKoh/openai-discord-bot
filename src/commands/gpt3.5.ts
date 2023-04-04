import { SlashCommandBuilder } from 'discord.js';
import { Configuration, OpenAIApi } from "openai";
import fs = require('fs');
import { openaiKey } from '../config.json';
import archive from '../data.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gpt')
		.setDescription('ChatGPT-3.5への質問できます。')
		.addStringOption(option =>
			option.setName('option')
				.setDescription('質問する内容を入力してください。')
				.setRequired(true)
		),
	async execute(interaction: any) {
		const option: string = interaction.options.getString('option');
		await interaction.deferReply();

		//APIキーと組織IDを設定
		const configuration: any = new Configuration({
			apiKey:	openaiKey
		});

		//OpenAI APIクライアントを作成
		const openai: any = new OpenAIApi(configuration);

		archive.push({role: "user", content: `この人のIDは${interaction.user.id}です。以下に質問が来ます。その人にあった回答をしてください。"質問": "${option}"` });

		//OpenAI APIを呼び出す
		try {
			const completion: any = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: archive,
			});
			await interaction.editReply(completion.data.choices[0].message.content);

			// データを書き込む
			archive.push({role: "assistant", content: completion.data.choices[0].message.content});
			const newData = JSON.stringify(archive);
			fs.writeFileSync('data.json', newData);
			
		} catch (error) {
			console.error(error);
		}
	},
};