const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let setName = 'character';
module.exports = {
    data: new SlashCommandBuilder()
    .setName('qg')
    .setDescription('/qg <nhân vật>')
    .addStringOption(option =>
		option.setName(setName)
			.setDescription('tên nhân vật bạn muốn xem quick guide')
			.setRequired(true)),
    async execute(client, interaction){
              
        var mint = interaction.options.getString(setName);
        mint = mint.toLowerCase();
        console.log("mint: " + mint);
        const fs = require('fs');
        var nanika = new Map();
        var slash = "※...............................................※ \n";
        var data= null;
        var checkExist = false;
        try {
            
            const jsonString = fs.readFileSync("./data/charList.json");
            data = JSON.parse(jsonString);
        } catch (err) {
            console.log(err);
            return;
        }
        try {

        let command = 'quickguide';
        let name = interaction.options.getString(setName);
        getTime2(client, interaction, command, name);
        
        let currentChannelID = interaction.channelId;
        let checkSpam = true;
        console.log("check " + data.spamChannel.includes(currentChannelID));
        if (data.spamChannel.includes(currentChannelID)) {
            checkSpam = false;
        }

        for (let index = 0; index < data.character.length; index++) {
            const fox = data.character[index];
            if (mint === fox.charName) {
              if (!fox.fgCheck) {
                console.log("zo fg");
                let embedArray = [];
                  for (let index = 0; index < fox.image.length; index++) {
                    const element = fox.image[index];
                    let newEmbed = new MessageEmbed().setTitle(`Lối chơi:  ${element.style}`).setColor(fox.color).setImage(element.img);
                    embedArray.push(newEmbed);
                    
                  }
          
                interaction.reply({embeds: embedArray, ephemeral: checkSpam});
                checkExist = true;
                return;
              } else{
                console.log("zo fg2");
                for (let index = 0; index < data.fullGuide.length; index++) {
                  const fg = data.fullGuide[index];
                  if (mint === fg.name) {
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
            
                    interaction.reply({embeds: embedArray, components: [row], ephemeral: checkSpam  });
                    checkExist = true;
                    return;
                  }
                  
                }
                return;
              }
            } 
        } 
        if (!checkExist) {
            interaction.reply({content : `Nhân vật này chưa có quick guide, dùng lệnh /qglist để xem danh sách các nhân vật đã có nhé`, ephemeral: checkSpam});
        }
      } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at slashQuickGuide.js");
    }
    }
}
