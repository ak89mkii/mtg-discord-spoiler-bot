// Initialize dotenv.
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
// Discord.js versions ^13.0 require us to explicitly define client intents.
const { Client, EmbedBuilder, Events, GatewayIntentBits, Collection } = require('discord.js');
// Imports undici library.
const { request } = require('undici');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.log('Ready!');
    console.log(`Logged in as ${c.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// client.on('interactionCreate', async (interaction) => {
// 	if (!interaction.isChatInputCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	}
// });

// client.on(Events.InteractionCreate, async interaction => {
// 	// ...
// 	if (commandName === 'cat') {
// 		const catResult = await request('https://aws.random.cat/meow');
// 		const { file } = await catResult.body.json();
// 		interaction.editReply({ files: [file] });
// 	}
// });

// Log In our bot.
client.login(process.env.CLIENT_TOKEN);