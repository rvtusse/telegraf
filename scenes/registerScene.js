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

registerScene.leave(function(ctx){
    ctx.reply("Ready? Select 'Get Started!' below.", Markup
    .keyboard(['Get Started!'])
    .oneTime()
    .resize()
    .extra()
  )
});
registerScene.on("contact", function(ctx){
    ctx.session.contact_number = ctx.update.message.contact.phone_number;
    ctx.reply("Thank you for registering your number with this Telegram profile!")
    addUser(ctx);
    ctx.scene.leave();
});

module.exports = registerScene;