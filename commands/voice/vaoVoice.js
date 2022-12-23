const {Client, Message, MessageEmbed} = require('discord.js');
const {
	entersState,
	VoiceConnectionStatus,
	joinVoiceChannel,
} = require('@discordjs/voice');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {

    const channel = message.member?.voice.channel;
		if (channel) {
			try {
        // await message.reply('Tính năng này tạm ngừng hoạt động để bảo trì');
				const connection = await connectToChannel(channel);
			} catch (error) {
				console.error(error);
			}
		} else {
			await message.reply('Vào voice room ngồi đi cái đã');
		}
}
module.exports.help = {
    name: 'vao',
    aliases: ["o"],
    description: "bruh"
}

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 600_000);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}