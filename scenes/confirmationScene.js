const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const confirmationScene = new Scene('confirmationScene')
const addIntent = require('../utils');





confirmationScene.enter(function (ctx) {
    ctx.reply('Your request has been processed.')
    ctx.reply('Would you like to do something else?', Markup
        .keyboard([
            ['Yes'],
            ['No']
          
        ])
        .oneTime()
        .resize()
        .extra()
    )
});




// confirmationScene.on('yes', function (ctx) {

//     console.log('Getting user intent..');

//     //CAPTURE USER INPUT FROM THE KEYBOARD
//     ctx.session.intent = ctx.message;

//     //CALLING THE ISER INTENT FUNCTION FROM UTILS.JS FILE  
//     addIntent.addUserIntent(ctx);
//     console.log(ctx.session.intent);


  

// });



module.exports = confirmationScene;
