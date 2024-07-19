import beeper from 'beeper';
import TelegramBot from 'node-telegram-bot-api';

const token = '475969461:AAHcyC-_0STvRrFwLKsfBWoLSmblPY6BxCM';
const bot = new TelegramBot(token, {polling: true});    // polling is the telegram-bot property

bot.on('message', function(msg) {
    const chatId = msg.chat.id;
    console.log("\x1b[36m%s\x1b[0m", "Name: " + msg.from.first_name);
    console.log("\x1b[33m%s\x1b[0m", "Message: " + msg.text);
    beeper(3);
    bot.sendMessage(chatId, "Hello! ", {caption: "I'm a bot!"});
})