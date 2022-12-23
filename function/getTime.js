async function getTime(client, message){
    var today = new Date();
    today.setHours(today.getHours() + 7);
    var str = today.toGMTString();
              
    let channel2 = client.channels.cache.get('959120662188933191');
    await channel2.send("User " + message.author.tag + " ----- " + message.content + " --- at:  " + str);
}

async function getTime2(client, interaction, command, setName){
    var today = new Date();
    today.setHours(today.getHours() + 7);
    var str = today.toGMTString();
              
    let channel2 = client.channels.cache.get('964538764703694931');
    await channel2.send("User " + interaction.member.user.tag + "-----" + command + " ----- " + setName + " ------- " + str);
}

module.exports = {getTime, getTime2}