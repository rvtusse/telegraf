const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const engineScene = new Scene('engineScene')
const axios = require('axios')

//DEAFULT KEYBOARD FOR EXISISTING USER
engineScene.enter(function (ctx) {
    console.log(ctx.session.state)
    ctx.reply('What would you like to do', Markup
        .keyboard([
            ['History'],
            ['Promo'],
            ['Exit']
        ])
        .oneTime()
        .resize()
        .extra()
    )
});

module.exports = engineScene;