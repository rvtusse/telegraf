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
            for(var i = 0; i < response.data.intents.length; i++) {
                console.log(i + ' ' +  response.data.intents[i]);
          
            ctx.session.contact_number = response.data.msidn
            ctx.reply (i + ' - ' + response.data.intents[i]);
       
            console.log(i + ' ) ' + response.data.intents[i]);
          
           
 
            console.log(response.data.intents)
        }
        


        })
      
        //ERROR HANDLING
        // .catch(err => console.log(err))
        // ctx.reply('Ooops!!, the service is currently down please try again in 5 minutes'+ '\nTo go back to main menu press /start')  
        ctx.reply('- To go back to main menu press /start')
})
 
    
savedIntentScene.hears('/start', ctx => ctx.scene.enter('defaultmenuScene'));  

module.exports = savedIntentScene;

