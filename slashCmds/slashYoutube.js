const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let command = 'yt';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('Hiện kênh youtube của LittleFox'),
    async execute(client, interaction){
        try {
            
            const fs = require('fs');
            var data= null;
            try {
                
                const jsonString = fs.readFileSync("./data/channel.json");
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(err);
                return;
            }
            channel = client.channels.cache.get(data.slashLog); //log

            let currentChannelID = interaction.channelId;
            let checkSpam = true;
            console.log("check " + data.spamChannel.includes(currentChannelID));
            if (data.spamChannel.includes(currentChannelID)) {
                checkSpam = false;
            }

            let setName= 'yt';
            getTime2(client, interaction, command, setName);
            await interaction.reply({content: `https://www.youtube.com/c/LittleFox2512`, ephemeral: checkSpam});
        } catch (error) {
            channel.send("Error at slashNOi.js");
        }
    }
}