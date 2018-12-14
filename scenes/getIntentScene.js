
//GET INTENT SECENE 
//WHAT EVER USER TYPES / REQUEST WE SEND IT TO ENGINE SCENE(HERVER)

const Scene = require('telegraf/scenes/base')
const addIntent = require('../utils');
const Markup = require('telegraf/markup');
const addUser = require('../utils');


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log(" Entering the default scene.");
    ctx.reply('What would you like to do?');
    ctx.reply('Choose your option below OR type what you would like', Markup
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


getIntentScene.hears("Exit", ctx => ctx.reply("Bye " +  ctx.update.message.chat.first_name));
getIntentScene.hears('Promos', ctx => ctx.scene.enter('promosScene'));

getIntentScene.hears('History', ctx => ctx.scene.enter('savedIntentScene'));

//GET USER INTENT FROM KEYBOARD 
getIntentScene.on('message', function (ctx) {

    console.log('Getting user intent..');

    //CAPTURE USER INPUT FROM THE KEYBOARD
    ctx.session.intent = ctx.message;
    ctx.session.contact_number = ctx.update.message.contact.phone_number;

    //CALLING THE ISER INTENT FUNCTION FROM UTILS.JS FILE  
    addIntent.addUserIntent(ctx);
    addUser.addUserDetails(ctx);
    console.log(ctx.session.intent);

     ctx.scene.enter('confirmationScene');
    // ctx.scene.leave()


})






module.exports = getIntentScene;