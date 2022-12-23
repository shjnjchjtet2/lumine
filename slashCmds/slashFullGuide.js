const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
let command = 'fg';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('Danh sách các nhân vật đã có full guide hướng dẫn có tâm'),
    async execute(client, interaction){
        try {
            channel = client.channels.cache.get('657115586287108107'); //log

            const fs = require('fs');
            var data= null;
            try {
                
                const jsonString = fs.readFileSync("./data/channel.json");
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

            let setName= 'fg';
            getTime2(client, interaction, command, setName);

            const newEmbed = new MessageEmbed()
            .addField('Danh sách các nhân vật đã có full guide hướng dẫn có tâm',  "[1. Albedo](https://youtu.be/m5fJ48ccvj8)\n"
            + "[2. Itto](https://youtu.be/5OUwKgLe7vc)\n"
            + "[3. Raiden Shogun](https://youtu.be/V8sRzxMCbpo)\n"
            + "[4. Yae Miko](https://youtu.be/CE9k8soZBvg)\n"
            + "[5. Zhongli](https://youtu.be/GFOAH-BMZNY)\n"
            + "[6. Shenhe](https://youtu.be/3TzGMUDSziU)\n"
            + "[7. Kamisato Ayato](https://youtu.be/3UmgRHjkR_I)\n"
            + "[8. Kazuha](https://www.youtube.com/watch?v=RkahS8CfPB0&t=19s)\n"
            + "[9. Heizou](https://www.youtube.com/watch?v=LWi_EeFti6U)\n"
            + "[10. Yoimiya](https://www.youtube.com/watch?v=Nblshmd6xX0)\n"
            + "[11. Tighnari](https://www.youtube.com/watch?v=qaRgKChjnZ8&t=1s)\n"
            + "[12. Cyno](https://www.youtube.com/watch?v=TiZSS3kLdSE)\n"
            + "[13. Nilou](https://www.youtube.com/watch?v=kvUee-cnCns)\n"
            + "[14. Nahida](https://www.youtube.com/watch?v=DF-sOnZtZCA)\n"
              )
            .setThumbnail('https://cdn.discordapp.com/attachments/657115586287108107/955889963071840266/lumine2-removebg-preview-removebg-preview.png')
            .setColor('WHITE');
    
            await interaction.reply({embeds: [newEmbed], ephemeral: checkSpam});

        } catch (error) {
            channel.send("Error at slashNOi.js");
        }
    }
}