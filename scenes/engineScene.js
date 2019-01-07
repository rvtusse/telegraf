// > sent user intent to process layer (sent to me from getintentsene)

// > if user exists: diplay routes from before(ask user to confirm whether or not routes are correct)
//      < yes/No
//     <No ... default menu from wasps
//     <Yes... we sure

// > if user does not exist (display default menu from wasps) 
//     < clik on options
//     < record every keystroke  (ctx.session.keystoke)
//     < send keystoke once user is done


//TO be removed
const parseString = require('xml2js').parseString;



const Scene = require('telegraf/scenes/base')
const engineScene = new Scene('engineScene')
const axios = require('axios')





engineScene.enter((ctx) => {
    let startingMenu = {
        STRING: '*121#',
        MSIDN: ctx.session.contact_number,
        PDU: 'PSSRR'

    }



    axios.post('http://fb2ee247.ngrok.io/processor/v1/actionRequest', startingMenu)
        .then((Response) => {
            console.log(Response.data)

            //check if there is a value
            if (Response.data) {
                parseString(Response.data, (err, result) => {
                    console.log("Init-==In A Promise-=-=-=");
                  
                    console.log(result.ussd.$);



                });

            }




            //ctx.reply(Response.data.STRING)
        })
})
engineScene.hears("Exit", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + "\nTo go back to main menu press /start"));
engineScene.hears("Back", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + "\nTo go back to main menu press /start"));
engineScene.hears('/start', ctx => ctx.scene.enter('defaultmenuScene'));

engineScene.on('message', (ctx) => {
    console.log(`user inputed ${ctx.message.chat.text}`)
    let userRequest = {
        STRING: ctx.message.text,
        MSIDN: ctx.session.contact_number,
        PDU: 'USSRC'
    }


    axios.post('https://processor-module.firebaseapp.com/processor/v1/actionRequest', userRequest)
        .then((response) => {
            ctx.reply(response.data.STRING)

        })
        .catch(error => {
            ctx.reply(error)
            ctx.reply('press start /start')

        })

    ctx.enter.scene('keystrokeScene')

})



//STORING KEYSTROKE

// bot.on('message', function (ctx) {
//     console.log('Getting user keystroke..');
//     ctx.session.keystroke = ctx.session.keystroke || '';
//         ctx.session.keystroke += ctx.message.text + ', ' ;
//         console.log(ctx.session.keystroke);
//         ctx.reply(ctx.session.keystroke);

//         console.log('keystrokes saved'); 
//     addIntent.addUserIntent(ctx);
//     console.log(ctx.session.keystroke);

// })







module.exports = engineScene;