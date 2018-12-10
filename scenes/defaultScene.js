const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const adminVerifyPhish = new Scene('registerUser');


const defaultScene = new Scene('defaultScene')
defaultScene.enter(function(ctx){
    console.log("Entering the default scene.");
    ctx.reply('Yoh! ' + ctx.update.message.chat.first_name + ',' + ' what would you like to do now?');
});
defaultScene.leave((ctx) => ctx.reply('Bye'))
defaultScene.on('message', (ctx) => ctx.reply('Send `hi`'));

module.exports = defaultScene;