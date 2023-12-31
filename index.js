/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { join, format } = require('path');
const Bot = require('./client/bot');
const SettingsProvider = require('./client/settings-provider');
const CommandsModule = require('./client/modules/commands');
const config = require('./config.json');
const moment = require('moment');


require("dotenv").config();


// LTS here just means that moment will 
// format the time in [H:M:S AM/PM]  
const time = moment().format("LTS")

// to do, trim off the unnecessary guilds and perms
// spoilers i didnt


const clientOptions = {
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
};

const settings = new SettingsProvider(config);
const bot = new Bot(clientOptions, settings);

const commandsModule = new CommandsModule();
commandsModule.loadFromDirectory(join(__dirname, 'commands'));




// ... gets member count

async function bootstrap() {

  await bot.registerModule('commands', commandsModule);

  bot.registerEvent('ready', async () => {

    // do i really have to explain when this shit runs
    console.log(`[${time}] Ready!`);

    await bot.init();
  })
}

bootstrap();
