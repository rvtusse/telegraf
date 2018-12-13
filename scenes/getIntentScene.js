const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const addIntent = require('../utils');
const adminVerifyPhish = new Scene('registerUser');
//const util = require('util')


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log("Entering the default scene.");
    ctx.reply('Hey! ' + ctx.update.message.chat.first_name + ',' + ' what would you like to do now?');
});
//getIntentScene.leave((ctx) => ctx.reply('Bye'))
getIntentScene.on('message', function (ctx) {
    addIntent.addUserIntent(ctx);
    console.log('Getting user intent..');

    ctx.scene.enter('engineScene');
})

app.use(Telegraf.memorySession())
module.exports = getIntentScene;