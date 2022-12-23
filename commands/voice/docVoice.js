const {Client, Message, MessageEmbed} = require('discord.js');
const {
	NoSubscriberBehavior,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	entersState,
	AudioPlayerStatus,
	VoiceConnectionStatus,
	joinVoiceChannel,
} = require('@discordjs/voice');
const { getAudioUrl } = require('google-tts-api');
const player = createAudioPlayer();
//npm i ffmpeg-static @discordjs/opus google-tts-api
//npm i @discordjs/opus
//npm i libsodium-wrappers
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    if(!args[0]) return message.reply(`Bạn muốn nói gì?`);
    let text = args.join(' ');
    if (text.lenght > 100) {
        return message.reply(`Nói ít thôi`);
    }

    const fs = require('fs');
        var data= null;
                
        const jsonString = fs.readFileSync("./data/ngonNgu.json");
        data = JSON.parse(jsonString);
        console.log("jsonString: " + jsonString);


    const audioURL = getAudioUrl(text, {
		lang: `${data.default}`,
		slow: false,
		host: 'https://translate.google.com',
		timeout: 10000,
	});
	
    const channel = message.member?.voice.channel;
		if (channel) {
			try {
				const connection = await connectToChannel(channel);
                
                await playSong(player, 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3');
				console.log("1");
                connection.subscribe(player);
				console.log("2");
			} catch (error) {
				console.error(error);
			}
		} else {
			await message.reply('Vào voice room ngồi đi cái đã');
		}
}
module.exports.help = {
    name: 'doc',
    aliases: ["o"],
    description: "bruh"
}

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});
	player.on(AudioPlayerStatus.Idle, () => {
		setTimeout(() => {
		//   message.channel.send('<:Bye:958269757541466145> **Queue finished... Leaving!**')
		  connection.disconnect();
		}, 60000);
	  })
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 600_000);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}


function playSong(player, audioURL) {
	const resource = createAudioResource(audioURL, {
		inputType: StreamType.Arbitrary,
	});

	player.play(resource);

	return entersState(player, AudioPlayerStatus.Playing, 5e3);
}
