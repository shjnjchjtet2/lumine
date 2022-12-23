const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');

module.exports = {
  data: { name: `character` },
  async execute(interaction, client) {
    const fs = require('fs');
    try {

      const jsonString = fs.readFileSync("./data/charList.json");
      data = JSON.parse(jsonString);
    } catch (err) {
      console.log(err);
      return;
    }

    
    let currentChannelID = interaction.channelId;
    let checkSpam = true;
    console.log("check " + data.spamChannel.includes(currentChannelID));
    if (data.spamChannel.includes(currentChannelID)) {
        checkSpam = false;
    }

    var AuthorUser = interaction.member.user.id;
    console.log("AuthorUser " + AuthorUser + ", user.id " + interaction.user.id)
    if (!(AuthorUser === interaction.user.id)) {
      console.log("AuthorUser " + AuthorUser + ", user.id " + interaction.user.id)
      return;
    }

    const value = interaction.values[0].toLowerCase();
    for (let index = 0; index < data.character.length; index++) {
      const fox = data.character[index];
      if (value === fox.charName) {
        if (!fox.fgCheck) {
          console.log("zo fg");
          let embedArray = [];
          for (let index = 0; index < fox.image.length; index++) {
            const element = fox.image[index];
            let newEmbed = new MessageEmbed().setTitle(`Lối chơi:  ${element.style}`).setColor(fox.color).setImage(element.img);
            embedArray.push(newEmbed);

          }

          interaction.reply({ embeds: embedArray, ephemeral: checkSpam });
          checkExist = true;
          return;
        } else {
          console.log("zo fg2");
          for (let index = 0; index < data.fullGuide.length; index++) {
            const fg = data.fullGuide[index];
            if (value === fg.name) {
              const row = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setURL(fg.link)
                    .setEmoji("<a:moe_yes:960909523248357416>")
                    .setLabel(`Full Guide nè`)
                    .setStyle('LINK')
                );
              let embedArray = [];
              for (let index = 0; index < fox.image.length; index++) {
                const element = fox.image[index];
                let newEmbed = new MessageEmbed().setTitle(`Lối chơi:  ${element.style}`).setColor(fox.color).setImage(element.img);
                embedArray.push(newEmbed);
              }

              interaction.reply({ embeds: embedArray, components: [row], ephemeral: checkSpam });
              checkExist = true;
              return;
            }
          }
          return;
        }
      }
    }
  }
}