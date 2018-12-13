const Telegraf = require('telegraf')
const  tt = require("telegram-typings")

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const getIntentScene = require('./scenes/getIntentScene');
const registerScene = require('./scenes/registerScene');
const engineScene = require('./scenes/engineScene');
const promosScene = require('./scenes/promosScene');
const confirmationScene = require('./scenes/confirmationScene');
const bot = new Telegraf("795833285:AAGBmXjnQMdNzS31jDP7eeHCDmEqpReqTF8");
var axios = require('axios');

// Create scene manager
const stage = new Stage()
stage.command('cancel', leave())

// Scene registration - Register all of the scenes here. 
stage.register(getIntentScene);
stage.register(registerScene);
stage.register(engineScene);
stage.register(promosScene);
stage.register(confirmationScene);


bot.use(session())
bot.use(stage.middleware());
// bot.command('greetingScene', (ctx) => ctx.scene.enter('greetingScene'));

bot.start(function (ctx) {

    //ctx.scene.enter('registerScene');
    ctx.reply("Y'ello!");
    axios.get('http://15de0c9a.ngrok.io/processor/v1/userDetails/' + ctx.chat.id)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exists, routing to the default menu.");
                console.log(response);
                
                ctx.session.contact_number = response.data.msdin
                ctx.scene.enter('engineScene');

                
            }
            else {
                console.log("[-] The user does not exist, routing to the registration scene.")
                ctx.scene.enter('registerScene');
            }
        });
    

})

bot.hears("Get Started!", ctx => ctx.scene.enter("getIntentScene"));
bot.hears("Exit", ctx => ctx.reply("Bye  " +  ctx.update.message.chat.first_name));
bot.hears('New Intent', ctx => ctx.scene.enter('getIntentScene'));
bot.hears('Promo', ctx => ctx.scene.enter('promosScene'));
bot.hears('Yes', ctx => ctx.scene.enter('engineScene'));
bot.hears("No", ctx => ctx.reply("Bye  " +  ctx.update.message.chat.first_name + '\nTo go back to main menu press /start'));

bot.startPolling()