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





engineScene.enter((ctx) => {
    let startingMenu = {
        STRING : '*121#',
        MSIDN : ctx.session.contact_number,
        PDU : 'PSSRR'

    }

        
    
        axios.post('https://processor-module.firebaseapp.com/processor/v1/actionRequest' ,startingMenu)
        .then((Response) => {
           console.log(Response.data)
           ctx.reply(Response.data.STRING)
        })
})


engineScene.on('message' , (ctx) => {
    console.log(`user inputed ${ctx.message.chat.text}`)
    let userRequest = {
        STRING : ctx.message.text,
        MSIDN: ctx.session.contact_number,
        PDU: 'USSRC'
    }
  

    axios.post('https://processor-module.firebaseapp.com/processor/v1/actionRequest' ,userRequest)
    .then((response) =>{
        ctx.reply(response.data.STRING)
        
    })
    .catch(error => {
        ctx.reply(error)
        ctx.reply('press start /start')
    })
    // .then((Response) => {
    //     //Hardcodede for now
    //     let msgPDU = {
    //         STRING : `${ctx.message.chat.text}`,
    //         MSIDN : ctx.session.contact_number,
    //         PDU : 'USSRC'

    //     }

    //     axios.post('http://050f26ce.ngrok.io/processor/v1/actionRequest' ,msgPDU)
    //     .then((Response) => {
    //         console.log(Response.data)
    //     })
    // })


})

engineScene.hears("Exit", ctx => ctx.reply("Bye " +  ctx.update.message.chat.first_name  + "\nTo go back to main menu press /start"));
engineScene.hears("Back", ctx => ctx.reply("Bye " +  ctx.update.message.chat.first_name  + "\nTo go back to main menu press /start"));
engineScene.hears('/start', ctx => ctx.scene.enter('defaultmenuScene'));



module.exports = engineScene;