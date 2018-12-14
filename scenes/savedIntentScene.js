
const Scene = require('telegraf/scenes/base')
const savedIntentScene = new Scene('savedIntentScene')
const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
//const util = require('util')




// GET STORED USER INTENT FROM THE PROCCESOR
savedIntentScene.enter((ctx) => {
    axios.get('http://d42a7750.ngrok.io/processor/v1/userIntents/' + ctx.session.contact_number )
        .then(response => {

            //CALLING KEYBOARD FUNCTION
            //startingKeyboard(response.data)
            console.log(response);
            ctx.reply(JSON.stringify(response.data.exists));
            //ctx.scene.enter('')

            ctx.reply('Would you like to do something else?', Markup
            .keyboard([

                response
            
            ])
            .oneTime()
            .resize()
            .extra()
    )

        })

})


/*
.catch((err) => {
    console.log('Sorry there was a problem please try again later', err)
    ctx.scene.enter('greetingScene');
})
*/
module.exports = savedIntentScene;

