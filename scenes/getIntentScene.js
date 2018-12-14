
//GET INTENT SECENE 
//WHAT EVER USER TYPES / REQUEST WE SEND IT TO ENGINE SCENE(HERVER)

const Scene = require('telegraf/scenes/base')
const addIntent = require('../utils');
const Markup = require('telegraf/markup');


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log("Entering the default scene.");
    ctx.reply('Hey! ' + ctx.update.message.chat.first_name + ',' + ' what would you like to do now?');
    ctx.reply('Choose your option below ', Markup
    .keyboard([
        ['History'],
        ['Promos'],
        ['Exit']
      
    ])
    .oneTime()
    .resize()
    .extra()
)


});


getIntentScene.hears("Exit", ctx => {
    // ctx.reply("Bye  " +  ctx.update.message.chat.first_name + '\nTo go back to main menu press /start') 
    ctx.scene.enter('confirmationScene');
});


//GET USER INTENT FROM KEYBOARD 
getIntentScene.on('message', function (ctx) {

    console.log('Getting user intent..');

    //CAPTURE USER INPUT FROM THE KEYBOARD
    ctx.session.intent = ctx.message;

    //CALLING THE ISER INTENT FUNCTION FROM UTILS.JS FILE  
    addIntent.addUserIntent(ctx);
    console.log(ctx.session.intent);

    // ctx.scene.enter('confirmationScene');
    // ctx.scene.leave()


})






module.exports = getIntentScene;