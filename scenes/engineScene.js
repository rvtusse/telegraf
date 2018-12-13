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
const Markup = require('telegraf/markup')
const engineScene = new Scene('engineScene')
const axios = require('axios')

//bot.start(function (ctx) {

engineScene.enter(function (ctx) {
<<<<<<< HEAD
    console.log(ctx.session.state)
    ctx.reply('What would you like to do', Markup
        .keyboard([
            ['History'],
=======

    axios.get('http://0b58526a.ngrok.io/processor/v1/userDetails/' + ctx.session.intent)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exist.");
                ctx.session.contact_number = response.data.intent
                ctx.scene.enter('savedIntentScene');
            }
            else {
                console.log("[-] The user does not exist.")
                
                //need to display default menu from the wasps using axios.get

                ctx.scene.enter('registerScene');    
            }


        })

    ctx.reply('What would you like to do today?', Markup
        .keyboard([
            ['Saved Intent'],
>>>>>>> 3bd78bcdede52259b05037e218628001a23a2bc6
            ['Promo'],
            ['Exit']
        ])
        .oneTime()
        .resize()
        .extra()
    )
});



module.exports = engineScene;