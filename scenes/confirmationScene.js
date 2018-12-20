//LET USER KNOW HIS REQUEST HAS BEEN PROCESSED
//CONFIRMING WHETHER OR NOT USER WANT TO DO ANOTHER TRANSACTION


const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const confirmationScene = new Scene('confirmationScene')
const addIntent = require('../utils');





confirmationScene.enter(function (ctx) {
    ctx.reply('Your request has been processed.')
    ctx.reply('Would you like to do something else?', Markup
        .keyboard([
            ['Yes'],
            ['No']
          
        ])
        .oneTime()
        .resize()
        .extra()
    )
});



confirmationScene.hears('No', function(ctx) {
    ctx.reply("Bye " +  ctx.update.message.chat.first_name + '\nTo go back to main menu press /start')
})
confirmationScene.hears('Yes', ctx => ctx.scene.enter('defaultmenuScene'));


  





module.exports = confirmationScene;
