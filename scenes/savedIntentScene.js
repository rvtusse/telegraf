//getting user saved intent from the process layer




const Scene = require('telegraf/scenes/base')
const savedIntentScene = new Scene('savedIntentScene')
const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');


// GET STORED USER INTENT FROM THE PROCCESOR
savedIntentScene.enter((ctx) => {
    axios.get('https://processor-module.firebaseapp.com/processor/v1/userIntents/' +  ctx.session.contact_number )
        .then(response => {
            for(var index = 0; index < response.data.intents.length; index++) {
                console.log(index + ' ' +  response.data.intents[index]);
          
            ctx.session.contact_number = response.data.msidn
            ctx.reply (index + ' ' + response.data.intents[index]);

            console.log(response.data.intents);
           

 
            console.log(response.data.intents)
        }


        })
        //ERROR HANDLING
        // .catch(err => console.log(err))
        // ctx.reply('Ooops!!, the service is currently down please try again in 5 minutes'+ '\nTo go back to main menu press /start')  

})

module.exports = savedIntentScene;

