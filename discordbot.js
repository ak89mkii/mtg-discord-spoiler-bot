// Initialize dotenv.
require('dotenv').config();

// Discord.js versions ^13.0 require us to explicitly define client intents.
const { Client, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');
// Imports undici library.
const { request } = require('undici');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const { commandName } = interaction;
// 	await interaction.deferReply();
// 	// ...
// });

client.on(Events.InteractionCreate, async interaction => {
	// ...
	if (commandName === 'cat') {
		const catResult = await request('https://aws.random.cat/meow');
		const { file } = await catResult.body.json();
		interaction.editReply({ files: [file] });
	}
});

// Log In our bot.
client.login('your-token-goes-here');