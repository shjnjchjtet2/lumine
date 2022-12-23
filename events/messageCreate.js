const Discord = require('discord.js');
const client = require('../index').Client
const { MessageEmbed} = require('discord.js');
const {gacha} = require('../function/gacha');
const {checkDM} = require('../function/checkDM');
const {autoReact} = require('../function/autoReact');
const {getTime} = require('../function/getTime');
const {greeting, chaoHoi} = require('../function/greeting');

const prefix =  process.env['prefix'];

const DMprefix = '>';
const fs = require('fs');
let hiCheck = false;
let byeCheck = false;
let nightCheck = false;

client.on('messageCreate', async message =>{
    let userCmd = message.content.toLowerCase();
    let channelMention = client.channels.cache.get('965149002339348540'); //mention log

    // autoReact(client, message);

    if (userCmd.includes("nani") && !message.author.bot && !userCmd.includes("_")) {
        await channelMention.send(`<@307170519101472769> -- User ${message.author.tag} -- ${message.content} -- <#${message.channelId}>`);
    }

    // if (message.channelId === '955089081342259271' && userCmd.includes("nnouncements")) {
    //     message.channel.send(`Có leak mới nè các tình iu <@&955090192631488623>`);
    //     return;
    // }

    // if (message.channelId === '957299334582526004' && userCmd.includes("leak") && message.author.id !== '955353165077827594') {
    //     message.channel.send(`Có leak tiếng Việt nè mấy chế ưi <@&955090192631488623>`);
    //     return;
    // }

    if(userCmd.includes("@here") || userCmd.includes("@everyone") || userCmd.includes("<@&")) return;

    // checkDM(client, message, userCmd, fs);
    // if (message.channel.type == "DM") return;

    var data= null;
    try {
        
        const jsonString = fs.readFileSync("./data/greeting.json");
        data = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
        return;
    }

    // gacha(client, message, userCmd);

    // greeting(client, message, data, userCmd);
    // if (hiCheck) return;
  
    // chaoHoi(client, message, data, userCmd, data.night , data.botNight);
    // if (nightCheck) return;

    // chaoHoi(client, message, data, userCmd, data.bye , data.botBye);
    // if (byeCheck) return;

    
    

    if (!userCmd.startsWith(prefix) || message.author.bot || message.channel.type == "DM") return;

    const args = userCmd.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === 'fg' || cmd === 'qg' || cmd === 'yt' || cmd === 'help' || cmd === 'qglist') {
        if (message.channelId !== '953912033651326986' && message.channelId !== '952167603160375306' && message.channelId !== '961587187621691472' && message.channelId !== '962316199226654740') {
            message.author.send("Lệnh này chỉ dùng được ở kênh <#952167603160375306> và <#953912033651326986> thôi bạn nhé");
             
            return;
        }
    }

  
      if (cmd === 'lang' || cmd === 'vao' || cmd === 'doc' || cmd === 'thoat') {
        if (message.channelId !== '952167603160375306' && message.channelId !== '962649100631830528') {
            message.author.send("Lệnh này chỉ dùng được ở kênh <#952167603160375306> và <#962649100631830528> thôi bạn nhé");
            
            return;
        }
    }

    let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(commands) {
        if (!userCmd.startsWith(prefix)) {
            return;
        }
        
        getTime(client, message);
        
        commands.run(client, message, args, prefix, DMprefix, Discord);
    } else{

    }

})
