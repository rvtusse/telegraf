
const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const keyboardScene = new Scene('keyboardScene');
const addIntent = require('../utils');


keyboardScene.enter(function (ctx) {
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

//GET USER INTENT FROM KEYBOARD 
keyboardScene.on('message', function (ctx) {

    console.log('Getting user intent..');

    //CAPTURE USER INPUT FROM THE KEYBOARD
    ctx.session.intent = ctx.message;

    //CALLING THE ISER INTENT FUNCTION FROM UTILS.JS FILE  
    addIntent.addUserIntent(ctx);
    console.log(ctx.session.intent);
    bot.hears('Promos', ctx => ctx.scene.enter('promoScene'));
   

})
module.exports = keyboardScene;