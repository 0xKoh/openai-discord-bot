import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import fs = require('fs');
import path = require('path');
import { token } from './config.json';

// Create a new client instance
const client: any = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.on('ready', () => { 
    console.log(`Logged in as ${client.user.tag}!`);
});

// set status
client.on('ready', () => { 
        client.user.setPresence({
          activities: [{name: `ChatGPT3.5`, type: 3}],
          status: 'online'
        });
});


// Create a new collection for commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, (interaction: { isChatInputCommand: () => any; }) => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

client.on(Events.InteractionCreate, async (interaction: { isCommand: () => any; commandName: any; }) => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
  
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
});

client.login(token);