//GETTING USER PHONE NUMBER TO REGISTER

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

<<<<<<< HEAD
     //TRYING THE CHAT ACTION TYPING not WORKING FOR NOW.

    //  bot.sendChatAction(chat_id=chat_id, action=telegram.ChatAction.TYPING)
=======
>>>>>>> 9f94613cd2224b92094e9d882cb7525f90f1494d
});




registerScene.on("contact", function (ctx) {
    ctx.session.contact_number = ctx.update.message.contact.phone_number;
    ctx.reply("Thank you for registering your number with this Telegram profile!")
    addUser.addUserDetails(ctx);
    
    ctx.scene.enter('getIntentScene');
});

module.exports = registerScene;