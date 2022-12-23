const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let setStringName = 'action';
let setUserName = 'target';
let command = 'act';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('/act <hành động> <đối tượng>, ví dụ /act punch LittleFox')
    .addStringOption(option =>
		option.setName(setStringName)
			.setDescription('Nhập 1 hành động vào đây, có thể dùng /actlist để xem hành động dùng được')
			.setRequired(true))
    .addUserOption(option => 
        option.setName(setUserName)
            .setDescription('Tag 1 người vào đây')
            .setRequired(true)),
    async execute(client, interaction){

        let stringName = interaction.options.getString(setStringName);
        stringName = stringName.trim().toLowerCase();
        let userName = interaction.options.getUser(setUserName);

        try{
            //test 657115586287108107
            //genera 952182492251717632
            //bot spam 952167603160375306
            channel = client.channels.cache.get('952182492251717632');
    
            const fs = require('fs');
            var data= null;
            try {
                
                const jsonString = fs.readFileSync("./data/action.json");
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(err);
                return;
            }

            let checkAct = false;
            for (let index = 0; index < data.action.length; index++) {
                const act = data.action[index];
                let random = Math.floor(Math.random() * act.list.length);
                let cau = Math.floor(Math.random() * data.cau.length);
                if (act.id === stringName) {
                    const newEmbed = new MessageEmbed()
                    .setDescription(`${data.cau[cau].name} ${act.name} ${userName}`)
                    .setImage(act.list[random].link)
                    .setColor("RANDOM");
                    await channel.send({embeds: [newEmbed]});
                    checkAct = true;
                    let name =  `${stringName} ${userName}`;
                    getTime2(client, interaction, command, name);
                    await interaction.reply({content: `Tin nhắn của bạn đã được gửi`, ephemeral: true});
                    return;
                }
            }
            if (!checkAct) {
                await interaction.reply({content : `Hành động này ko có sẵn, gõ lệnh /actlist để xem các hành động dùng được nhé`, ephemeral: true});
                return;
            }
      
        } catch (error) {
            console.log(error);
            let channel2 = client.channels.cache.get('959120662188933191');
            await channel2.send("Error at slashAction.js");
        }

        
    }
}