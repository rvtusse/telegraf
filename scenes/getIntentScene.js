
//GET INTENT SECENE 
//WHAT EVER USER TYPES / REQUEST WE SEND IT TO ENGINE SCENE(HERVER)

const Scene = require('telegraf/scenes/base')
const addIntent = require('../utils');


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log("Entering the default scene.");
    ctx.reply('Hey! ' + ctx.update.message.chat.first_name + ',' + ' what would you like to do now?');


});


//GET USER INTENT FROM KEYBOARD 
getIntentScene.on('message', function (ctx) {

    console.log('Getting user intent..');

    //CAPTURE USER INPUT FROM THE KEYBOARD
    ctx.session.intent = ctx.message;

    //CALLING THE ISER INTENT FUNCTION FROM UTILS.JS FILE  
    addIntent.addUserIntent(ctx);
    console.log(ctx.session.intent);


    ctx.scene.enter('confirmationScene');

})


module.exports = getIntentScene;