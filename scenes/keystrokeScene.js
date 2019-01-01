//GET USER KEYSTROKE 
//STORE USER KEYSTROKE ON FIRESTORE


const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const addIntent = require('../utils');
const axios = require('axios')
const keystrokeScene = new Scene('keystrokeScene')

//STORING KEYSTROKE
keystrokeScene.enter(function (ctx) {
    console.log("Enter scene.");
    ctx.reply('ohh');


});

keystrokeScene.hears("Exit", ctx => ctx.reply("Bye " +  ctx.update.message.chat.first_name +", see yah.." + "\nTo go back to main menu press /start"));

keystrokeScene.hears('/start', ctx => ctx.scene.enter('defaultmenuScene'));


keystrokeScene.on('message', function (ctx) {
    console.log('Getting user keystroke..');
    ctx.session.keystroke = ctx.session.keystroke || '';
        ctx.session.keystroke += ctx.message.text + ', ' ;
        console.log(ctx.session.keystroke);
        ctx.reply(ctx.session.keystroke);
    
        console.log('keystrokes saved'); 
    addIntent.addUserIntent(ctx);
    console.log(ctx.session.keystroke);
    
})

module.exports = keystrokeScene;