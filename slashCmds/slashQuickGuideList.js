const { Discord, Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getTime2 } = require('../function/getTime');
let command = 'qglist';
module.exports = {
  data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('Hiện danh sách các nhân vật đã có quick guide'),
  async execute(client, interaction) {

    const fs = require('fs');
    var nanika = new Map();
    var slash = "※...........................................................................※ \n";
    var data = null;
    try {
      const jsonString = fs.readFileSync("./data/charList.json");
      data = JSON.parse(jsonString);
    } catch (err) {
      console.log(err);
      return;
    }

    let setName = 'qglist';
    getTime2(client, interaction, command, setName);

    let currentChannelID = interaction.channelId;
    let checkSpam = true;

    if (data.spamChannel.includes(currentChannelID)) {
      checkSpam = false;
    }

    try {
      var AuthorUser = interaction.member.user.id;
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

      const element = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('element')
          .setPlaceholder('Chọn 1 nguyên tố')
          .addOptions(
            data.dropDownElement
          ),
      );

      const character = new MessageActionRow()
              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('character')
                  .setPlaceholder('Chọn 1 nhân vật để xem quickguide')
                  .addOptions(
                    data.dropDown[0].char
                  ),
              );

      let messageEmbed = await interaction.reply({ embeds: [nanika.get('Pyro')], fetchReply: true, ephemeral: checkSpam, components: [element, character] });

      //fetch reaction
      // for (let index = 0; index < data.element.length; index++) {
      //   const culac = data.element[index];
      //   messageEmbed.react(culac.icon);
      // }

      //handle user reaction
      // client.on('messageReactionAdd', async (reaction, user) => {
      //   if (reaction.message.partial) {
      //     await reaction.message.fetch();
      //   }
      //   if (reaction.partial) {
      //     await reaction.fetch();
      //   }
      //   if (user.bot) {
      //     return;
      //   }

      //   if (AuthorUser === user.id && reaction.message.id === messageEmbed.id) {
      //     if (reaction.emoji.id === data.element[0].icon) {
      //       selectMenu(reaction, data, messageEmbed, nanika, 0);
      //       reaction.users.remove(user);
      //       return;
      //     } else
      //       if (reaction.emoji.id === data.element[1].icon) {
      //         selectMenu(reaction, data, messageEmbed, nanika, 1);
      //         reaction.users.remove(user);
      //         return;
      //       } else
      //         if (reaction.emoji.id === data.element[2].icon) {
      //           selectMenu(reaction, data, messageEmbed, nanika, 2);
      //           reaction.users.remove(user);
      //           return;
      //         } else
      //           if (reaction.emoji.id === data.element[3].icon) {
      //             selectMenu(reaction, data, messageEmbed, nanika, 3);
      //             reaction.users.remove(user);
      //             return;
      //           } else
      //             if (reaction.emoji.id === data.element[4].icon) {
      //               selectMenu(reaction, data, messageEmbed, nanika, 4);
      //               reaction.users.remove(user);
      //               return;
      //             } else
      //               if (reaction.emoji.id === data.element[5].icon) {
      //                 selectMenu(reaction, data, messageEmbed, nanika, 5);
      //                 reaction.users.remove(user);
      //                 return;
      //               } else
      //                 if (reaction.emoji.id === data.element[6].icon) {
      //                   selectMenu(reaction, data, messageEmbed, nanika, 6);
      //                   reaction.users.remove(user);
      //                   return;
      //                 }
      //     reaction.users.remove(user);
      //   } else if (reaction.message.id === messageEmbed.id) {
      //     reaction.users.remove(user);
      //   }
      // });
      // return;
    } catch (error) {
      console.log(error);
      let channel2 = client.channels.cache.get('959120662188933191');
      await channel2.send("Error at slash qglist.js");
    }

  }
}

async function selectMenu(reaction, data, messageEmbed, nanika, number){
  console.log("int " + number);
  if (reaction.emoji.id === data.element[number].icon) {
    const character = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('character')
        .setPlaceholder('Chọn nhân vật để xem quickguide')
        .addOptions(
          data.dropDown[number].char
        ),
    );
    messageEmbed.edit({ embeds: [nanika.get(data.element[number].name)], components: [character] });
}
}
