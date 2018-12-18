const Scene = require('telegraf/scenes/base')
const promoScene = new Scene('promoScene')
const axios = require('axios')



promoScene.enter((ctx) => {
    ctx.reply('Hi there ' + ctx.update.message.chat.first_name + ' Did you know?')
    axios.get('http://36ab43a2.ngrok.io/processor/v1/promotions')
        .then(response => {
            ctx.reply(response.data.advert);
        });

    ctx.reply('To go back to main menu press /start')
})
// .catch(err => console.log(err))
// ctx.reply('Ooops!!, the service is currently down please try again in 5 minutes'+ '\nTo go back to main menu press /start')  

module.exports = promoScene;