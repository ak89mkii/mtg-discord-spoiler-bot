// Initialize dotenv.
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
// Discord.js versions ^13.0 require us to explicitly define client intents.
const { Client, EmbedBuilder, Events, GatewayIntentBits, Collection, IntentsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, ] });

client.commands = new Collection();


// Slash Command Path:
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


// Bot Initialization Message:
client.once(Events.ClientReady, c => {
	console.log('Ready!');
    console.log(`Logged in as ${c.user.tag}!`);
});


// Sends Slash Commands:
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


// Log In Our Bot:
client.login(process.env.CLIENT_TOKEN);