const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const confirmationScene = new Scene('confirmationScene')





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

module.exports = confirmationScene;