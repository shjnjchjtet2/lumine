const {Client, Message, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
const fs = require('fs');
let setName = 'content';
module.exports = {
    data: new SlashCommandBuilder()
    .setName('tamsu')
    .setDescription('/tamsu <nội dung muốn tâm sự>')
    .addStringOption(option =>
		option.setName(setName)
			.setDescription('nhập nội dung vào đây')
			.setRequired(true)),
    async execute(client, interaction){
        try {
            const fs = require('fs');
            var data= null;
            var data2= null;
            try {
                
                const jsonString2 = fs.readFileSync("./data/channel.json");
                data2 = JSON.parse(jsonString2);
            } catch (err) {
                console.log(err);
                return;
            }

            channel = client.channels.cache.get(data2.tamSuChannel); //main channel
            channel2 = client.channels.cache.get(data2.slashLog); //log
            
            
                const jsonString = fs.readFileSync("./data/randomNum.json");
                data = JSON.parse(jsonString);
                console.log("jsonString: " + jsonString);
            
            
            timeNow = new Date();
            console.log("time:" + timeNow.getTime());
            if (timeNow.getTime() > data.time) {
                let ranNum = Math.floor(Math.random() * 12 + 1);
                if (ranNum === data.randomNum) {
                    ranNum = ranNum +1;    
                } 
                data.randomNum = ranNum;
                do{
                    data.time = data.time + 43200000; // + 12 hours
                } while(timeNow.getTime() > data.time)
                fs.writeFile("./data/randomNum.json", JSON.stringify(data), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(data, null, 2));
                    console.log('writing to ' + jsonString);
                });
                channel.send("Thông báo, số ID đã được làm mới <a:moe_chore:959079479312015430> \n Gõ /tamsu <nội dung> để tâm sự cùng người lạ các bạn nhé!");
            }
            userId = interaction.member.user.id;
            maMau = userId.substring(data.randomNum,data.randomNum + 6);
            maskId = userId.substring(data.randomNum,data.randomNum + 3);
            maskId2 = parseInt(maskId) + data.randomNum;
            
            const embedNe = new MessageEmbed()
            .setColor(maMau)
            .setTitle(`Bạn có số ID ${maskId2} nhắn: `)
            .setDescription(interaction.options.getString('content'));
            
            channel.send({ embeds: [embedNe] });
            
            let command = 'tâm sự';
            let name = interaction.options.getString(setName);
            getTime2(client, interaction, command, name);
            await interaction.reply({content: `Tin nhắn của bạn đã được gửi đến kênh <#${data2.tamSuChannel}>`, ephemeral: true});
        } catch (error) {
            channel2.send("error at slashTamsu.js");
        }
    }
}
    