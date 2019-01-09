//GETTING PROMOS ADVERT FROM PROCESS LAYER

const Scene = require('telegraf/scenes/base')
const promoScene = new Scene('promoScene')
const axios = require('axios')



promoScene.enter((ctx) => {
    ctx.reply('Hi there ' + ctx.update.message.chat.first_name + ' Did you know?')
    axios.get('https://processor-module.firebaseapp.com/processor/v1/promotions')
        .then(response => {
            ctx.reply(response.data.advert);
        });

    ctx.reply('To go back to main menu press /menu')


})
// .catch(error => {
//     console.log("RESPOnse ERRRrrrrr ====");
//     ctx.reply(error)
//     ctx.reply('press menu / menu')
// })

promoScene.hears('/menu', ctx => ctx.scene.enter('defaultmenuScene'));
module.exports = promoScene;