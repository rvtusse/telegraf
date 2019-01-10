// > sent user intent to process layer (sent to me from getintentsene)

// > if user exists: diplay routes from before(ask user to confirm whether or not routes are correct)
//      < yes/No
//     <No ... default menu from wasps
//     <Yes... we sure

// > if user does not exist (display default menu from wasps) 
//     < clik on options
//     < record every keystroke  (ctx.session.keystoke)
//     < send keystoke once user is done






const Scene = require('telegraf/scenes/base')
const engineScene = new Scene('engineScene')
const axios = require('axios')
const addIntent = require('../utils');





engineScene.enter((ctx) => {
    console.log('engine ohoh')
    let startingMenu = {
        STRING: '*121#',
        MSISDN: ctx.session.contact_number,
        PDU: 'PSSRR'
    }
    axios.post('http://f048f2b5.ngrok.io/processor/v1/actionRequest', startingMenu)
        .then((Response) => {
            console.log(Response.data)
            ctx.reply(Response.data.STRING)
        })
})
engineScene.hears("Exit", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + "\nTo go back to main menu press /menu"));
engineScene.hears("Back", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + "\nTo go back to main menu press /menu"));
engineScene.hears('/menu', ctx => ctx.scene.enter('defaultmenuScene'));

engineScene.on('message', (ctx) => {
    console.log(`user inputed ${ctx.message.text}`)
    if (ctx.message.text.length === 1) {
        ctx.session.keystroke = ctx.session.keystroke || '';
        ctx.session.keystroke += ctx.message.text + ', ';
        console.log('keystroke')

    } else {

        ctx.session.intent = ctx.message.text;
        console.log('intent')
    }
    let userRequest = {
        STRING: ctx.message.text,
        MSISDN: ctx.session.contact_number,
        PDU: 'USSRC'
    }
    console.log("++++++++++++++");
    console.log(userRequest)

    axios.post('http://f048f2b5.ngrok.io/processor/v1/actionRequest', userRequest)
        .then((response) => {

            let menuWASP = response.data.STRING
            for (var x = 0; x < menuWASP.length; x++){

                if (menuWASP[x].startsWith(ctx.session.keystroke)){
            
                    var whatistheusersnumberchoice = ctx.session.keystroke;//
                    
                    var whatistheuserstextchoice = menuWASP[x].replace(ctx.session.keystroke, "");//
                    console.log("User sent us: "+whatistheusersnumberchoice.toString());
                    console.log("The text is: "+whatistheuserstextchoice);
                    //var finalPush = {};
                    //finalPush[ctx.session.keystroke] = whatistheuserstextchoice
                    
                }
            }
         
 
            console.log(menuWASP);
            console.log(menuWASP);
            console.log("RESPOnse ====");

            ctx.reply(response.data.STRING);

            if (response.data.PDU === "PSSRC") {
                addIntent.addUserIntent(ctx);
                console.log('intent saved...');
                ctx.enter.scene('confirmationScene')
            }
        })
})
// .catch(error => {
//     console.log("RESPOnse ERRRrrrrr ====");
//     ctx.reply(error)
//     ctx.reply('press menu / menu')

//
























module.exports = engineScene;