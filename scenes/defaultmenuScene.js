//KEYBOARD ROOTING TO USER OPTION

const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const defaultmenuScene = new Scene('defaultmenuScene');
const Extra = require('telegraf/extra')
const addIntent = require('../utils');


defaultmenuScene.enter(function (ctx) {
    ctx.reply('Choose your option below or type what you would like to do', Markup
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

defaultmenuScene.hears("Exit", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + ", see yah.." + "\nTo go back to main menu press /menu"));

defaultmenuScene.hears('/menu', ctx => ctx.scene.enter('defaultmenuScene'));

defaultmenuScene.on('message', function (ctx) {
    console.log('Getting user intent..');
    ctx.session.intent = ctx.message.text;
    console.log(ctx.session.intent);
    ctx.scene.enter('engineScene')
})


module.exports = defaultmenuScene;