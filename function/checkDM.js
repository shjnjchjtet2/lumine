async function checkDM(client, message, userCmd, fs){
    if (message.channel.type != "DM") {
        return;
    }
    
    if (!userCmd.startsWith(DMprefix) || message.author.bot) return;
    const args = userCmd.slice(DMprefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(commands) {
        if (!message.content.startsWith(DMprefix)) {
            return;
        }
        console.log("User " + message.author.tag + " dung command: " + userCmd);
        
        getTime(client, message);
      
        commands.run(client, message, args, DMprefix, Discord, fs);
    } else{
        //test: 653718872360222760
        message.reply(`Sai cú pháp rồi bạn ei, nhập ${DMprefix}ts để tâm sự ẩn danh ở kênh <#653718872360222760> nhé`);
    }

}

module.exports = {checkDM }