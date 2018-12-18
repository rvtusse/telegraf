
const Scene = require('telegraf/scenes/base')
const savedIntentScene = new Scene('savedIntentScene')
const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
//const util = require('util')




// GET STORED USER INTENT FROM THE PROCCESOR
savedIntentScene.enter((ctx) => {
    axios.get('http://16592cec.ngrok.io/processor/v1/userIntents/' +  ctx.session.contact_number )
        .then(response => {

            if (response.data.exists === true) {
                console.log("[+] The user exists in database");
                ctx.session.contact_number = response.data.msdin
            }
            else {
                console.log("[-] The user does not exist")
               
            }

            
            console.log(response.data);
            ctx.reply (response.data.exists);
           

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

})
//return JSON.parse(JSON.stringify(value))


/*
.catch((err) => {
    console.log('Sorry there was a problem please try again later', err)
    ctx.scene.enter('greetingScene');
})
*/
module.exports = savedIntentScene;

