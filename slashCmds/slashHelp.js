const {Discord, Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {getTime2} = require('../function/getTime');
const prefix =  process.env['prefix'];
let command = 'luhelp';
module.exports = {
    data: new SlashCommandBuilder()
    .setName(command)
    .setDescription('Danh sách các lệnh có sẵn'),
    async execute(client, interaction){
        try{

            let setName= 'help';
            getTime2(client, interaction, command, setName);

            const newEmbed = new MessageEmbed()
            .setTitle("Danh sách các lệnh có sẵn")
            .setThumbnail('https://cdn.discordapp.com/attachments/666271696436854784/955870871501815858/emojisky.com-16075281.png')
            .addFields(
                { name: `${prefix}qg <nhân vật> hoặc /qg <nhân vật>`, value: `Hiện quick guide của nhân vật - ví dụ: ${prefix}qg hutao hoặc /qg hutao` },
                { name: `${prefix}qg list hoặc /qglist`, value: 'Hiện danh sách nhân vật đã có quick guide' },
                { name: `${prefix}yt hoặc /yt`, value: 'Hiện kênh youtube của LittleFox, nhớ subscribe nhé' },
                { name: `${prefix}fg hoặc /fg`, value: 'Hiện danh sách nhân vật đã có full guide' },
                { name: `/noi <nội dung muốn nói>`, value: 'Thay lời muốn nói (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>)' },
                { name: `/ratio <tỉ lệ bạo kích 1> <sát thương bạo kích 1> <tỉ lệ bạo kích 2> <Sát thương bạo kích 2>`, value: 'So sánh giá trị bạo kích của 2 set' },
                { name: `/tamsu <nội dung tâm sự>`, value: 'Tâm sự ẩn danh ở kênh <#958813128630628422> nhé' },
                { name: `/act <hành động> <đối tượng>`, value: `Hành động ẩn danh đến đối tượng (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>), nhập /actlist để xem hành động dùng được nhé` },
            )
            .setColor('WHITE');
            
            // const newEmbed2 = new MessageEmbed()
            // .setTitle("Các lệnh liên quan đến voice")
            // .setThumbnail('https://cdn.discordapp.com/attachments/666271696436854784/955870871501815858/emojisky.com-16075281.png')
            // .addFields(
            //     { name: `${prefix}vao`, value: `Gọi bot vào kênh` },
            //     { name: `${prefix}thoat`, value: 'Cho bot đi ngủ' },
            //     { name: `${prefix}doc <nội dung>`, value: 'thay lời muốn nói, gửi nội dung để bot đọc giùm bạn' },
            //     { name: `${prefix}lang <ngôn ngữ>`, value: `thay đổi ngôn ngữ đọc của bot, ví dụ: ${prefix}lang vi` },
            // )
            // .setColor('WHITE');
    
            await interaction.reply({embeds: [newEmbed], ephemeral: true});
        } catch (error) {
            console.log(error);
            let channel2 = client.channels.cache.get('959120662188933191');
            await channel2.send("Error at help.js");
        }
    }
}