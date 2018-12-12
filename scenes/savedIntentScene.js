
const Scene = require('telegraf/scenes/base')
const savedIntentScene = new Scene('savedIntentScene')
const axios = require('axios')
const Extra = require('telegraf/extra')

//THIS IS A KEYBOARD FUNCTION
function startingKeyboard(menu) {
    defaultKeyboard = menu
    console.log('This is the keyboard function')
    bot.keyboard(defaultKeyboard)

}
// GET STORED USER INTENT FROM THE PROCCESOR
savedIntentScene.enter((ctx) => {
    axios.get('http://0b58526a.ngrok.io/processor/v1/userIntents/' + ctx.session.contact_number)
        .then(response => {

            //CALLING A KEYBOARD FUNCTION
            startingKeyboard(response.data)
            console.log(response);
            ctx.reply(response.data);

        })

})

savedIntentScene.enter((ctx) => {
    axios.get('http://0b58526a.ngrok.io/processor/v1/userIntents/' + ctx.session.contact_number)
        .then(response => {
            console.log(response);
            ctx.reply(response.data);
        });
    console.log(ctx);
})
savedIntentScene.hears("hello", function (ctx) {
    console.log("here.");
});
/*
bot.catch((err) => {
    console.log('Sorry there was a problem please try again later', err)
    ctx.scene.enter('greetingScene');
})
*/
module.exports = savedIntentScene;

