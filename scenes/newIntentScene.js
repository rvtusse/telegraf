const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const newIntentScene = new Scene('newIntentScene')
const Extra = require('telegraf/extra')



newIntentScene.enter((ctx) => {
    console.log(ctx)
})

newIntentScene.on('message' , (ctx) => {
    console.log(ctx)

})

module.exports = newIntentScene;