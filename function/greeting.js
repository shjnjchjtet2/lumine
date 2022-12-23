const {getTime} = require('./getTime');

async function chaoHoi(client, message, data, userCmd, loiChao , botChao){
    let checkLoiChao = false;
    let objectt = data.objectt;
    let checkObjectt = false;
    
    loiChao.forEach(element => {
        if (userCmd.includes(element)) {
            return checkLoiChao = true;
        }
    });
    objectt.forEach(element => {
        if (userCmd.includes(element) && !userCmd.includes(":")) {
            return checkObjectt = true;
        }
    });

    //channel test: 657115586287108107
    //general: 952182492251717632
    //cao: 635674138890993684
    if (message.channelId === '952182492251717632' && checkObjectt && checkLoiChao && !message.author.bot) {
        let emotePart = data.emoPart;
        let greetRandom = Math.floor(Math.random() * botChao.length);
        let emoteRandom = Math.floor(Math.random() * emotePart.length);
        message.channel.send(`${botChao[greetRandom].name} <@${message.author.id}> <${emotePart[emoteRandom].name}>`);
        getTime(client, message);
        return chaoCheck = true;
    }
    return chaoCheck = false;
}

async function greeting(client, message, data, userCmd, hiCheck){
    let greeting = data.greeting;
    let checkGreeting = false;
    let objectt = data.objectt;
    let checkObjectt = false;
    
    let arr = userCmd.split(" ", 2);

    let firstWord = arr[0]; 
    greeting.forEach(element => {
        if (firstWord.includes(element)) {
            console.log("alo"+ userCmd.includes("chao"));
            if (firstWord === 'xin' && userCmd.includes("chao")) {
                return checkGreeting = true;
            } else if (firstWord === 'xin' && userCmd.includes("chào")) {
                return checkGreeting = true;
            } else if(firstWord === 'xin'){
                return checkGreeting = false;
            }
            return checkGreeting = true;
        }
    });
    objectt.forEach(element => {
        if (userCmd.includes(element) && !userCmd.includes("lỗi") && !userCmd.includes("lũi") && !userCmd.includes("đấy") && !userCmd.includes(":")) {
            return checkObjectt = true;
        }
    });

    //channel test: 657115586287108107
    //general: 952182492251717632
    if (message.channelId === '952182492251717632' && checkObjectt && checkGreeting && !message.author.bot) {
        let botPart = data.botHi;
        let emotePart = data.emoPart;
        let greetRandom = Math.floor(Math.random() * botPart.length);
        let emoteRandom = Math.floor(Math.random() * emotePart.length);
        message.channel.send(`${botPart[greetRandom].name} <@${message.author.id}> <${emotePart[emoteRandom].name}>`);
        getTime(client, message);
        return  hiCheck = true;
    }
    return hiCheck = false;
}


module.exports = {greeting, chaoHoi }