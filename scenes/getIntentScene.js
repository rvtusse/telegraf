
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
    ctx.session.intent = ctx.message;
    addIntent.addUserIntent(ctx);
    console.log( ctx.session.intent);

    ctx.scene.enter('confirmationScene');

})




module.exports = getIntentScene;