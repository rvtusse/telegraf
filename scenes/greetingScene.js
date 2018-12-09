const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const adminVerifyPhish = new Scene('registerUser');


const greeter = new Scene('greeter')
greeter.enter((ctx) => ctx.reply('Hi'))
greeter.leave((ctx) => ctx.reply('Bye'))
greeter.on('message', (ctx) => ctx.reply('Send `hi`'))

module.exports = greeter;