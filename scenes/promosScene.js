const Scene = require('telegraf/scenes/base')
<<<<<<< HEAD:scenes/promosScene.js
const promosScene = new Scene('promosScene')
=======
const promosScene = new Scene('promosScene ')
>>>>>>> 3bd78bcdede52259b05037e218628001a23a2bc6:scenes/promosScene.js
const TT = require("telegram-typings")
const axios = require('axios')
const util = require('util')


<<<<<<< HEAD:scenes/promosScene.js
promosScene.enter((ctx) => {
    console.log("Entering the promos scene.");
=======
 promosScene.enter((ctx) => {
    console.log(ctx);
>>>>>>> 3bd78bcdede52259b05037e218628001a23a2bc6:scenes/promosScene.js
    ctx.reply('Hi there ' + ctx.update.message.chat.first_name + ' Did you know?')
    axios.get('http://15de0c9a.ngrok.io/processor/v1/promotions')
        .then(response => {
            console.log(response);
            ctx.reply(response.data.advert);
        });
    console.log(ctx);
<<<<<<< HEAD:scenes/promosScene.js
    ctx.reply('To go back to main menu press /start');
=======
 ctx.reply('To go back to main menu press /start')
>>>>>>> 3bd78bcdede52259b05037e218628001a23a2bc6:scenes/promosScene.js
})
/*
bot.catch((err) => {
    console.log('Ooops there is something wrong, retry in 5 minutes', err)
    ctx.scene.enter('savedIntentScene');
});
*/
<<<<<<< HEAD:scenes/promosScene.js
module.exports = promosScene;
=======
module.exports = promosScene ;
>>>>>>> 3bd78bcdede52259b05037e218628001a23a2bc6:scenes/promosScene.js
