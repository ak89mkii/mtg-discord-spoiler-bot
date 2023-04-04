const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newmtg')
		.setDescription("Shows this year's (2023) MTG card spoilers."),
	async execute(interaction) {
		const cardResult = await request('https://api.scryfall.com/cards/search?order=released&q=year=2023');
		const { file } = await cardResult.body.json();
		await interaction.deferReply({ files: [file] });
	},
};