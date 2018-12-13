
//GET INTENT SECENE 
//WHAT EVER USER TYPES / REQUEST WE SEND IT TO ENGINE SCENE(HERVER)

const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const addIntent = require('../utils');
const adminVerifyPhish = new Scene('registerUser');


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log(ctx.session.state)
    ctx.reply('What would you like to do', Markup
        .keyboard([
            ['History'],
            ['Promo'],
            ['Exit']
        ])
        .oneTime()
        .resize()
        .extra()
    )
});

getIntentScene.on('message', function (ctx) {
    addIntent.addUserIntent(ctx);
    console.log('Getting user intent..');

    ctx.scene.enter('confirmationScene');
})

const axios = require('axios')
const Extra = require('telegraf/extra')

//THIS IS A KEYBOARD FUNCTION
// function startingKeyboard(menu) {
//     defaultKeyboard = menu
//     console.log('This is the keyboard function')
//     bot.keyboard(defaultKeyboard)

//    
// }

// function sendUserIntent(ctx) {

//     getIntentScene.on("message", function (ctx) {
//         ctx.session.intent = ctx.update.message.data;
//         ctx.reply("Your request has been captured , thanks")
//     });

//     let intent = {

//         userData: ctx.session.intent

//     }

//     //SEND USER DATA TO HERVER END-POINT ENGINE SCENE
//     getIntentScene.enter((ctx) => {

//         axios.post('http://15de0c9a.ngrok.io/processor/v1/savedIntent/' + intent)
//             .then(response => {

//                 //CALLING A KEYBOARD FUNCTION
//                 startingKeyboard(response.data)
//                 console.log(response);
//                 console.log(intent);
//                 ctx.reply(response.data);
//             })
//         console.log(intent);
//     })
// }

// // GET STORED USER INTENT FROM THE PROCCESOR
// getIntentScene.enter((ctx) => {
//     axios.get('http://15de0c9a.ngrok.io/processor/v1/savedIntent/' + ctx.contact.phone_number)
//         .then(response => {

//             //CALLING A KEYBOARD FUNCTION
//             startingKeyboard(response.data)
//             console.log(response);
//             ctx.reply(response.data);
//         })

// })

/*
bot.catch((err) => {
    console.log('Sorry there was a problem please try again later', err)
    ctx.scene.enter('greetingScene');
})
*/

module.exports = getIntentScene;