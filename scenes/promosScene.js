const Scene = require('telegraf/scenes/base')
const promosScene = new Scene('promosScene ')
const TT = require("telegram-typings")
const axios = require('axios')

 ChatAction = 'typing'
 promosScene.enter((ctx) => {
    console.log(ctx);
    ctx.reply('Hi there ' + ctx.update.message.chat.first_name + ' Did you know?')
    axios.get('http://0b58526a.ngrok.io/processor/v1/promotions')
        .then(response => {
            console.log(response);
            ctx.reply(response.data.advert);
        });
    console.log(ctx);
    // ctx.scene.enter('engineScene');
})
/*
bot.catch((err) => {
    console.log('Ooops there is something wrong, retry in 5 minutes', err)
    ctx.scene.enter('savedIntentScene');
});
*/
module.exports = promosScene ;