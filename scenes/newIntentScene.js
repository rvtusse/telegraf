const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const newIntentScene = new Scene('newIntentScene')
const Extra = require('telegraf/extra')
const axios = require('axios')


newIntentScene.enter((ctx) => {
    axios.post('http://0b58526a.ngrok.io/processor/v1/actionRequest', { "PDU": "PSSRR", "MSISDN": ctx.session.contact_number, "STRING": "*121#" })
        .then(response => {
            console.log(response);
            ctx.reply(response.data);
        });
    console.log(ctx);
});

newIntentScene.on('message', (ctx) => {
    console.log(ctx);
    var userInput = ctx.message;

    //Need to put the user input in here and send it to the WASP. I don't know how to do that right now. 
    axios.post('http://0b58526a.ngrok.io/processor/v1/actionRequest', { "PDU": "PSSRR", "MSISDN": ctx.session.contact_number, "STRING": "*121#" })
        .then(response => {
            console.log(response);
            ctx.reply(response.data);
        });
    console.log(ctx);
});

module.exports = newIntentScene;