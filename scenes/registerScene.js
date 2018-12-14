const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const registerScene = new Scene('registerScene')
const Extra = require('telegraf/extra')
const addUser = require('../utils');


registerScene.enter(function (ctx) {
    ctx.reply('Please share your contact number with us.', Extra.markup((markup) => {
        return markup.resize()
            .keyboard([
                markup.contactRequestButton('Share your mobile number'),
            ])
    }));
});



registerScene.on("contact", function (ctx) {
    ctx.session.contact_number = ctx.update.message.contact.phone_number;
    ctx.reply("Thank you for registering your number with this Telegram profile!")
    addUser.addUserDetails(ctx);
    
    ctx.scene.enter('getIntentScene');
});

module.exports = registerScene;