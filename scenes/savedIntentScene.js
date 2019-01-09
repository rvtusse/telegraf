//getting user saved intent from the process layer




const Scene = require('telegraf/scenes/base')
const savedIntentScene = new Scene('savedIntentScene')
const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');


// GET STORED USER INTENT FROM THE PROCCESOR
savedIntentScene.enter((ctx) => {
    axios.get('https://processor-module.firebaseapp.com/processor/v1/userIntents/' + ctx.session.contact_number)
        .then(response => {
            console.log(response.data);
            for (var i = 0; i < response.data.intents.length; i++) {
                console.log(i + ' ' + response.data.intents[i]);

                ctx.session.contact_number = response.data.msidn
                ctx.reply(i + ' - ' + response.data.intents[i]);

                console.log(i + ' ) ' + response.data.intents[i]);



                console.log(response.data.intents)
            }



        })

    ctx.reply('- To go back to main menu press /menu')
}).catch(error => {
    console.log("RESPOnse ERRRrrrrr ====");
    ctx.reply(error)
    ctx.reply('press menu / menu')
})


savedIntentScene.hears('/menu', ctx => ctx.scene.enter('defaultmenuScene'));

module.exports = savedIntentScene;

