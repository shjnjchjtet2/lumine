const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try{
        if(!args[0]) return message.reply(`Bạn muốn đổi sang ngôn ngữ nào? ví dụ: ${prefix}lang vi`);
        if (args[0].length >2) {
            return message.reply(`Mã ngôn ngữ chỉ tối đa 2 kí tự`);
        }
        const fs = require('fs');
        var data= null;
                
        const jsonString = fs.readFileSync("./data/ngonNgu.json");
        data = JSON.parse(jsonString);
        console.log("jsonString: " + jsonString);
        
        let checkOk = false;
        for (let index = 0; index < data.ngonNgu.length; index++) {
            const element = data.ngonNgu[index];
            if (element.id === args[0]) {
                data.default = args[0];
                fs.writeFile("./data/ngonNgu.json", JSON.stringify(data), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(data, null, 2));
                    console.log('writing to ' + jsonString);
                  });
                checkOk = true;
                message.reply(`Đã chuyển ngôn ngữ sang ${data.ngonNgu[index].name}`);
                return;
            }
        }
        if (!checkOk) {
            return message.reply(`Mã ngôn ngữ này ko có trong danh sách`);
        }

    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at noi.js");
    }
}
module.exports.help = {
    name: 'lang',
    aliases: ["o"],
    description: "bruh"
}