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





engineScene.on('message', (ctx) => {
    console.log(`user inputed ${ctx.message.chat.text}`)
    // let userRequest = {
    //     userKeyStrokes : ctx.message,
    //     userMsidsn: ctx.session.contact_number,
    //     pdu: 'ussrrc'
    // }
    //Hardcodede for now
    let startingMenu = {
        STRING: '*121#',
        MSIDN: ctx.session.contact_number,
        PDU: 'PSSRR'

    }

    axios.post('http://050f26ce.ngrok.io/processor/v1/actionRequest', startingMenu)
        .then((response) => {
            ctx.reply(response.data.STRING)
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





module.exports = engineScene;