const {Client, Message, MessageEmbed} = require('discord.js');
async function autoReact(client, message){
    
    if (message.channelId === '957299334582526004' && message.author.id !== '955353165077827594') {
    
        const fs = require('fs');
        var data= null;
        try {
            
            const jsonString = fs.readFileSync("./data/emoji.json");
            data = JSON.parse(jsonString);
        } catch (err) {
            console.log(err);
            return;
        }
        // var randTimes = Math.floor(Math.random()*(data.emoji.length - data.emoji.length/2) + data.emoji.length/2);
        // var reactedArray = [];
        // for (let index = 0; index < randTimes; index++) {
        //     var randomIndex = Math.floor(Math.random()*data.emoji.length);
        //     while (reactedArray.includes(randomIndex)) {
        //         randomIndex = Math.floor(Math.random()*data.emoji.length);
        //     }
        //     var aReact = data.emoji[randomIndex].id;
        //     message.react(aReact);
        //     reactedArray[randomIndex];
        // }

        message.react(data.emoji[Math.floor(Math.random()*data.emoji.length)].id);

    }
}

module.exports = {autoReact }