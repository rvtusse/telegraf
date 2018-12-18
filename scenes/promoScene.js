const Scene = require('telegraf/scenes/base')
const promoScene = new Scene('promoScene')
const axios = require('axios')



 promoScene.enter((ctx) => {
    console.log(ctx);
    ctx.reply('Hi there ' + ctx.update.message.chat.first_name + ' Did you know?')
    axios.get('http://16592cec.ngrok.io/processor/v1/promotions')
        .then(response => {
            console.log(response);
            ctx.reply(response.data.advert);
        });
    console.log(ctx);
 ctx.reply('To go back to main menu press /start')
})
/*
bot.catch((err) => {
    console.log('Ooops there is something wrong, retry in 5 minutes', err)
    ctx.scene.enter('savedIntentScene');
});
*/
module.exports = promoScene ;