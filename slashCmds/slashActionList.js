const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let command = 'actlist';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('Hiện danh sách các hành động có sẵn'),
    async execute(client, interaction){

        try{
            //test 657115586287108107
            //genera 952182492251717632
            //bot spam 952167603160375306
            channel = client.channels.cache.get('657115586287108107');
    
            const fs = require('fs');
            var data= null;
            try {
                
                const jsonString = fs.readFileSync("./data/action.json");
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(err);
                return;
            }

                let listAction = "";
                data.actionList.forEach(element => {
                    listAction = listAction + element + "\n";
                });
                const newEmbed = new MessageEmbed()
                    .setTitle(`Danh sách các hành động dùng được`)
                    .setDescription(listAction)
                    .addField(`Cú pháp mẫu`,`/act dam LittleFox`)
                    .setColor("AQUA");
                await interaction.reply({embeds: [newEmbed], ephemeral: true});
                let setName = 'actlist';
                getTime2(client, interaction, command, setName);
                
                return;
      
        } catch (error) {
            console.log(error);
            let channel2 = client.channels.cache.get('959120662188933191');
            await channel2.send("Error at slashActionLIst.js");
        }

        
    }
}