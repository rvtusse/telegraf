//KEYBOARD ROOTING TO USER OPTION

const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const defaultmenuScene = new Scene('defaultmenuScene');
const Extra = require('telegraf/extra')
const addIntent = require('../utils');


defaultmenuScene.enter(function (ctx) {
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
defaultmenuScene.hears('Promos', ctx => ctx.scene.enter('promoScene')); 

defaultmenuScene.hears('History', ctx => ctx.scene.enter('savedIntentScene'));

defaultmenuScene.on('message', function (ctx) {
    console.log('Getting user intent..');

    //CAPTURE USER INPUT FROM THE KEYBOARD
    ctx.session.intent = ctx.message;




    //CALLING THE USER INTENT FUNCTION FROM UTILS.JS 
    addIntent.addUserIntent(ctx);
    console.log(ctx.session.intent);
    ctx.scene.enter('confirmationScene')
})


module.exports = defaultmenuScene;