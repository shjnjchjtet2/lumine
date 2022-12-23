const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"] }, { partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports.Client = client;

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { exec } = require('child_process');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const keepAlive = require("./server");
const envFile = dotenv.config();
const token = process.env['tokenLumine'];
const guild = process.env['guildFox'];
const app_id = process.env['app_id_lu'];
// const token = 'OTU2NDgxMjczNzY4MDc5NDEw.Yjw2mg.tcPbbg6gH7T8bhO01dakORNUUxw';
// const guild = '307171473322409984';
// const app_id = '956481273768079410';

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slashCmds = new Discord.Collection();
client.menus = new Discord.Collection();
client.events = new Discord.Collection();



//commands handler
fs.readdirSync('./commands/').forEach(dir => {
  fs.readdir(`./commands/${dir}`, (err, files) => {
    if (err) {
      throw err;
    }

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
      return console.log("no command");
    }

    jsFiles.forEach(file => {
      var fileGet = require(`./commands/${dir}/${file}`);
      // console.log(`command file ${file} loaded`);

      try {
        client.commands.set(fileGet.help.name, fileGet);

        fileGet.help.aliases.forEach(alias => {
          client.aliases.set(alias, fileGet.help.name);
        })
      } catch (error) {
        return console.log("Failed at command section", error);
      }
    });
  });
});

//event handler
fs.readdirSync('./events/').forEach(file => {

  var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) {
    return console.log("no slash");
  }

  jsFiles.forEach(file => {
    var events = require(`./events/${file}`);
    console.log(`event file ${file} loaded`);

    try {
      client.events.set(events.name, events);
    } catch (error) {
      return console.log("Failed at event section", error);
    }
  });
});

//menu handler

var jsFiles = fs.readdirSync('./menus/').filter(f => f.split(".").pop() === "js");
if (jsFiles.length <= 0) {
  console.log("no slash");
}

jsFiles.forEach(file => {
  var fileGet = require(`./menus/${file}`);

  try {
    client.menus.set(fileGet.data.name, fileGet);
  } catch (error) {
    return console.log("Failed at slash section", error);
  }
});


//slash handler
const slashCommands = [];
// fs.readdirSync('./slashCmds/').forEach(dir =>{

var jsFiles = fs.readdirSync('./slashCmds/').filter(f => f.split(".").pop() === "js");
if (jsFiles.length <= 0) {
  console.log("no slash");
}

jsFiles.forEach(file => {
  var fileGet = require(`./slashCmds/${file}`);
  slashCommands.push(fileGet.data.toJSON());

  try {
    client.slashCmds.set(fileGet.data.name, fileGet);
  } catch (error) {
    return console.log("Failed at slash section", error);
  }
});
// });

const rest = new REST({ version: '9' }).setToken(token);
(async () => {
  try {
    console.log("start regist");

    await rest.put(
      guild
        ? Routes.applicationGuildCommands(app_id, guild) : Routes.applicationGuildCommands(app_id),
      {
        body: slashCommands
      }
    );
    console.log("regist ok " + slashCommands.length);

  } catch (error) {

    console.log(error);
  }
})();


try{
client.once('ready', () => {
  console.log('Bot da khoi donga!');
  client.user.setActivity('/luhelp hoặc lu!help', { type: 'PLAYING' })
});
  
} catch (err) {
  exec('kill 1', (err1, stdout, stderr) => {
  if (err1) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
}





client.on("debug", ( e ) => console.log(e));
keepAlive();

client.login(token);

