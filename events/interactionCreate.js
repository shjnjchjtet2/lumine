const client = require('../index').Client;
const Discord = require('discord.js');
client.menus = new Discord.Collection();

client.on('interactionCreate', async inter =>{
    if (inter.isCommand()) {
        let slash = client.slashCmds.get(inter.commandName);
        if (slash) {
            try {
                await slash.execute(client, inter);
                
            } catch (error) {
                await inter.reply({content: 'Sumting wong', ephemeral: true})
                console.log(error);
            }
        }
    } else if(inter.isSelectMenu()){
        const menu = client.menus.get(inter.customId);
        console.log("inter.customId "+inter.customId + " " +menu);
        if (!menu) {
            console.log("zo ne");

            return await inter.reply({content : "no menu code"})
        }
        try {
            console.log("zo exe");
            await menu.execute(inter, client);
        } catch (err){
            console.log(err);
        }
    }
    
})
