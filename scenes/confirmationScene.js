const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const confirmationScene = new Scene('confirmationScene')
const axios = require('axios')



//CONFIRMATION KEYBOARD FOR USER YES/NO
//IF HE/SHE WOULD LIKE TO DO SOMETHING ELSE AFTER HIS DONE WITH INTENT.
confirmationScene.enter(function (ctx) {
    ctx.reply('Your request has been proccesed')
    ctx.reply('Would you like to do something else?', Markup
        .keyboard([
            [' Yes '],
            [' No ']
        ])
        .oneTime()
        .resize()
        .extra()
    )
});

module.exports = confirmationScene