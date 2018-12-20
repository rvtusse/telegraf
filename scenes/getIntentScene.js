
//GET USER INTENT 
//STORE USER INTENT ON FIREBASE


const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const addIntent = require('../utils');
const axios = require('axios')


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log("Entering the default scene.");
    ctx.reply('Hey! ' + ctx.update.message.chat.first_name + ',' + ' what would you like to do now?');


});

getIntentScene.on('message', function (ctx) {

    console.log('Getting user intent..');
    ctx.session.chatid = ctx.update.message.chat.id
    ctx.session.intent = ctx.message.chat.text;
    console.log(ctx.session.contact_number)
    addIntent.addUserIntent(ctx);

    console.log(ctx.session.intent);

    ctx.scene.enter('engineScene');

})




module.exports = getIntentScene;