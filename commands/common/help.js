const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try{

        if(args[0]) message.reply(`Nhập ${prefix}help thôi là được rồi, gõ chi lắm zậy <:emo_cringe:956929017636855829>`);
        const newEmbed = new MessageEmbed()
        .setTitle("Danh sách các lệnh có sẵn")
        .setThumbnail('https://cdn.discordapp.com/attachments/666271696436854784/955870871501815858/emojisky.com-16075281.png')
        .addFields(
            { name: `/qg <nhân vật> hoặc ${prefix}qg <nhân vật>`, value: `Hiện quick guide của nhân vật - ví dụ: ${prefix}qg hutao hoặc /qg hutao` },
            { name: `/qglist hoặc ${prefix}qg list`, value: 'Hiện danh sách nhân vật đã có quick guide' },
            { name: `/yt hoặc ${prefix}yt`, value: 'Hiện kênh youtube của LittleFox, nhớ subscribe nhé' },
            { name: `/fg hoặc${prefix}fg`, value: 'Hiện danh sách nhân vật đã có full guide' },
            { name: `/noi <nội dung muốn nói>`, value: 'Thay lời muốn nói (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>)' },
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

        

        message.channel.send({embeds: [newEmbed]});
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at help.js");
    }
}
module.exports.help = {
    name: 'help',
    aliases: ["o"],
    description: "bruh"
}