const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const engineScene = new Scene('engineScene')
const axios = require('axios')

//DEAFULT KEYBOARD FOR EXISISTING USER
engineScene.enter(function (ctx) {

    ctx.reply('What would you like to do today?', Markup
        .keyboard([
            [' New Intent'],
            ['Saved Intent'],
            ['Promo'],
            ['Exit']
        ])
        .oneTime()
        .resize()
        .extra()
    )
});

module.exports = engineScene;