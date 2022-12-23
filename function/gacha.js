const {MessageEmbed} = require('discord.js');
const {getTime} = require('./getTime');
async function gacha(client, message, userCmd){
    const fs = require('fs');
    var data= null;
    try {
        
        const jsonString = fs.readFileSync("./data/gift.json");
        data = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
        return;
    }
    //channel test: 657115586287108107
    //general: 952182492251717632
    //cao: 635674138890993684
    
    if (message.author.bot) return;    
    let checkEmoji = (userCmd.match(/</g) || []).length;
    let cauOk = userCmd.length;
    if (checkEmoji > 0) {
        cauOk = userCmd.length - checkEmoji*30;
    }
     if (cauOk > 8) {
        let randNum = Math.floor(Math.random() * 2000);
        let congrat = Math.floor(Math.random() * data.congrat.length);
        let giftValue = Math.floor(Math.random() * data.giftXua.length);
        let thumb = Math.floor(Math.random() * data.icon.length);
        let channel2 = client.channels.cache.get('959120662188933191');
        
        if (randNum === 6999) {
            console.log("randNum: " + randNum);
            let nice = `Chúc mừng <@${message.author.id}> ${data.congrat[congrat].name} **${data.giftXua[giftValue].description}**`;
            let nice2 = `:boom: <@307170519101472769> Chúc mừng ${message.author.tag} ${data.congrat[congrat].name} ${data.giftXua[giftValue].description}`;
            let mint1 = new MessageEmbed()
                    .setTitle(`Congratulation! :boom:`)
                    .setDescription(nice)
                    .setThumbnail(data.icon[thumb].name)
                    .setColor("RANDOM")
                    .setFooter({ text: 'Xủa gắt lên để nhận tiếp những phần quà hấp dẫn nhé'});
            message.channel.send({embeds: [mint1]});
            await channel2.send(nice2);

            getTime(client, message);
        } else if (randNum === 99999){
            let noice = message.channel.send(`Chúc mừng <@${message.author.id}> đã trúng một thẻ đổi màu tên, hãy liên hệ admin để nhận quà nhé`);
            await channel2.send(noice);
        }
    }
}

module.exports = {gacha }




