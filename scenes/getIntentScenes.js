
//GET INTENT SECENE 
//WHAT EVER USER TYPES / REQUEST WE SEND IT TO ENGINE SCENE(HERVER)

const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup');
const addIntent = require('../utils');
const axios = require('axios')


const getIntentScene = new Scene('getIntentScene')
getIntentScene.enter(function (ctx) {
    console.log("Entering the default scene.");
    ctx.reply('Hey! ' + ctx.update.message.chat.first_name + ',' + ' what would you like to do now?');
    

});

getIntentScene.on('message', function (ctx) {
    addIntent.addUserIntent(ctx);

    addIntent.sendUserIntent(ctx);
    console.log('Getting user intent..');

    //Capture user input from keyboard
    ctx.session.intent = ctx.message;

    ctx.scene.enter('confirmationScene');
})


// GET STORED USER INTENT FROM THE PROCCESOR
axios.get('http://15de0c9a.ngrok.io/processor/v1/savedIntent/' + ctx.contact.phone_number)
    .then(response => {

        //CALLING A KEYBOARD FUNCTION
        console.log(response.data)
        console.log(response);
        ctx.reply(response.data);
    })

module.exports = getIntentScene;