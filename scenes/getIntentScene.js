
//GET FIRST TIME USER INTENT 


const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');



const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    ctx.reply('What would you like to do ?');


});
getIntentScene.hears('/menu', ctx => ctx.scene.enter('defaultmenuScene'));

getIntentScene.on('message', function (ctx) {

    console.log('Getting user intent..');
    ctx.session.chatid = ctx.update.message.chat.id
    ctx.session.intent = ctx.message.text;

    ctx.session.keystrokeArr = []
    ctx.session.keystrokeArr.push(ctx.session.intent)

    console.log(ctx.session.contact_number)
    ctx.scene.enter('engineScene');
})

module.exports = getIntentScene;