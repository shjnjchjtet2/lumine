const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');

module.exports = {
  data: { name: `element` },
  async execute(interaction, client) {
    const fs = require('fs');
    try {

      const jsonString = fs.readFileSync("./data/charList.json");
      data = JSON.parse(jsonString);
    } catch (err) {
      console.log(err);
      return;
    }

    var nanika = new Map();
    let currentChannelID = interaction.channelId;
    let checkSpam = true;
    console.log("check " + data.spamChannel.includes(currentChannelID));
    if (data.spamChannel.includes(currentChannelID)) {
        checkSpam = false;
    }

    for (let index = 0; index < data.element.length; index++) {
        const culac = data.element[index];
        let mint1 = new MessageEmbed()
          .setTitle(culac.vnName)
          .setImage(culac.img)
          .addField('Cú pháp mẫu', `/qg traveler`, true)
          .setColor(culac.color);

        nanika.set(culac.name, mint1);
      }
      if (checkSpam) {
        await interaction.reply({ content: `Hãy sử dụng lệnh này ở kênh <#${data.spamChannel[0]}> và <#${data.spamChannel[1]}> nhé`, ephemeral: true });
        return;
      }

    const value = interaction.values[0].toLowerCase();

    for (let index = 0; index < data.dropDownElement.length; index++) {
        if (value === data.dropDown[index].ele) {

            const element = new MessageActionRow()
            .addComponents(
              new MessageSelectMenu()
                .setCustomId('element')
                .setPlaceholder(data.dropDown[index].label)
                .addOptions(
                  data.dropDownElement
                ),
            );

            const character = new MessageActionRow()
            .addComponents(
              new MessageSelectMenu()
                .setCustomId('character')
                .setPlaceholder('Chọn nhân vật để xem quickguide')
                .addOptions(
                  data.dropDown[index].char
                ),
            );
            interaction.update({ embeds: [nanika.get(data.element[index].name)], components: [element, character] });
      }
        
    }

   
}
}