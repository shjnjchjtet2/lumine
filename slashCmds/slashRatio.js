const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let command = 'ratio';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('So sánh giá trị bạo kích của 2 set')
    .addNumberOption(option => option.setName('tỉ-lệ-bạo-kích-1').setDescription('Tỉ lệ bạo kích #1').setRequired(true))
    .addNumberOption(option => option.setName('sát-thương-bạo-kích-1').setDescription('Sát thương bạo kích #1').setRequired(true))
    .addNumberOption(option => option.setName('tỉ-lệ-bạo-kích-2').setDescription('Tỉ lệ bạo kích #2').setRequired(true))
    .addNumberOption(option => option.setName('sát-thương-bạo-kích-2').setDescription('Sát thương kích #2').setRequired(true)),
    async execute(client, interaction){
        try {
            let critRate1 = interaction.options.getNumber('tỉ-lệ-bạo-kích-1')/100;
            if (critRate1>1) {
                critRate1=1;
            }
            let critDmg1 = interaction.options.getNumber('sát-thương-bạo-kích-1')/100;
            let critRate2 = interaction.options.getNumber('tỉ-lệ-bạo-kích-2')/100;
            if (critRate2>1) {
                critRate2=1;
            }
            let critDmg2 = interaction.options.getNumber('sát-thương-bạo-kích-2')/100;
            console.log(`check 1`);
            var ratio = 1;
            let result ='';
            if (critRate1*critDmg1 > critRate2*critDmg2) {
                ratio = ((1 + critRate1*critDmg1) - (1 + critRate2*critDmg2))/(1 + critRate2*critDmg2);
                ratio = Number((ratio*100).toFixed(2));
                result = `Set thứ nhất mạnh hơn Set thứ hai ${(ratio)}%`;
            } else if(critRate1*critDmg1 < critRate2*critDmg2){
                ratio = ((1 + critRate2*critDmg2) - (1 + critRate1*critDmg1))/(1 + critRate1*critDmg1);
                ratio = Number((ratio*100).toFixed(2));
                result = `Set thứ hai mạnh hơn Set thứ nhất ${(ratio)}%`;
            } else{
                result = `Hai set có giá trị như nhau`;
            }
            console.log(`TLBK: ${critRate1} và STBK:  ${critDmg1}, TLBK: ${critRate2} và STBK:  ${critDmg2}, ratio:  ${ratio}`)
            value1 =Number((1 + critRate1*critDmg1) *100).toFixed(2);
            value2 =Number((1 + critRate2*critDmg2) *100).toFixed(2);
            tlbk1= Number((critRate1*100).toFixed(2));
            stbk1= Number((critDmg1*100).toFixed(2));
            tlbk2= Number((critRate2*100).toFixed(2));
            stbk2= Number((critDmg2*100).toFixed(2));
            const newEmbed = new MessageEmbed()
            .setTitle('So sánh giá trị bạo kích')     
            .setThumbnail(`https://cdn.discordapp.com/attachments/962316199226654740/1023202380797444177/ch_1101.png`)       
            .addFields(
                { name: `Set thứ nhất: ${tlbk1}/${stbk1}`, value:`${value1}% damage` },
                { name: `Set thứ hai: ${tlbk2}/${stbk2}`, value: `${value2}% damage` },
                { name: `Kết quả`, value: `${result}` }
                )
                .setColor('WHITE');
                
            await interaction.reply({embeds: [newEmbed], ephemeral: false});
                
        } catch (error) {
            channel.send("Error at slashRatio.js");
        }
    }
}