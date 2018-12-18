
const Scene = require('telegraf/scenes/base')
const savedIntentScene = new Scene('savedIntentScene')
const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
//const util = require('util')




// GET STORED USER INTENT FROM THE PROCCESOR
savedIntentScene.enter((ctx) => {
    axios.get('http://36ab43a2.ngrok.io/processor/v1/userIntents/' +  ctx.session.contact_number )
        .then(response => {

            if (ctx.session.contact_number === null) {
                console.log("[+] The user exists in database");
                ctx.session.contact_number = response.data.msdin
            }
            else {
                console.log("[-] The user does not exist")
               
            }

            
            console.log(response.data);
            ctx.reply (response.data);
           

    //        ctx.reply('Would you like to do something else?', Markup
    //         .keyboard([

    //          [response.data],
    //          ['texting']
            
    //         ])
    //         .oneTime()
    //         .resize()
    //         .extra()
    // )

        })
        // .catch(err => console.log(err))
        // ctx.reply('Ooops!!, the service is currently down please try again in 5 minutes'+ '\nTo go back to main menu press /start')  

})

module.exports = savedIntentScene;

