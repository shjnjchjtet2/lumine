const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
const prefix =  process.env['prefix'];
let command = 'off';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('Off Topic'),
    async execute(client, interaction){
        try{

            let setName= 'off';
            getTime2(client, interaction, command, setName);

            await interaction.reply('https://cdn.discordapp.com/attachments/960469353319526400/1034409090962702417/off.png');
        } catch (error) {
            console.log(error);
            let channel2 = client.channels.cache.get('959120662188933191');
            await channel2.send("Error at help.js");
        }
    }
}