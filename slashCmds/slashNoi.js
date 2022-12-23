const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let setName = 'content';
let command = 'noi';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('/noi <nội dung muốn nói>')
    .addStringOption(option =>
		option.setName(setName)
			.setDescription('nhập nội dung vào đây')
			.setRequired(true)),
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

            channel = client.channels.cache.get(data.noiChannel); 
            await channel.send(interaction.options.getString('content'));
            let name = interaction.options.getString(setName);
            getTime2(client, interaction, command, name);
            await interaction.reply({content: `Tin nhắn của bạn đã được gửi đến kênh <#${data.noiChannel}>`, ephemeral: true});
        } catch (error) {
            channel.send("Error at slashNOi.js");
        }
    }
}