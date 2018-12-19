
//GET INTENT SECENE 
//WHAT EVER USER TYPES / REQUEST WE SEND IT TO ENGINE SCENE(HERVER)

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

    //Capture user input from keyboard
    // ctx.session.contact_number = ctx.update.message.contact.phone_number;
    // ctx.session.contact_number = response.data.msdin
    ctx.session.chatid = ctx.update.message.chat.id
    ctx.session.intent = ctx.message;
    console.log(ctx.session.contact_number)
    addIntent.addUserIntent(ctx);

    console.log(ctx.session.intent);

    ctx.scene.enter('confirmationScene');

})




module.exports = getIntentScene;