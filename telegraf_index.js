const Telegraf = require('telegraf')
const TT = require("telegram-typings")

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const greetingScene = require('./scenes/greetingScene');
const getIntentScene = require('./scenes/getIntentScene');
const registerScene = require('./scenes/registerScene');
const newIntentScene = require('./scenes/newIntentScene');
const savedIntentScene = require('./scenes/savedIntentScene');
const engineScene = require('./scenes/engineScene');
const chitChatScene = require('./scenes/chiChatScene');
const bot = new Telegraf("795833285:AAGBmXjnQMdNzS31jDP7eeHCDmEqpReqTF8");
var axios = require('axios');

// Create scene manager
const stage = new Stage()
stage.command('cancel', leave())

// Scene registration - Register all of the scenes here. 
stage.register(greetingScene);
stage.register(getIntentScene);
stage.register(registerScene);
stage.register(newIntentScene);
stage.register(savedIntentScene);
stage.register(engineScene);
stage.register(chitChatScene)


bot.use(session())
bot.use(stage.middleware());
bot.command('greetingScene', (ctx) => ctx.scene.enter('greetingScene'));

ChatAction = 'typing'
bot.start(function (ctx) {
    //ctx.scene.enter('registerScene');
    ctx.reply("Y'ello!");
    axios.get('http://0b58526a.ngrok.io/processor/v1/userDetails/' + ctx.chat.id)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exists, routing to the default menu.");
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
bot.hears('New Intent', ctx => ctx.scene.enter('getIntentScene'))
bot.hears('Promo', ctx => ctx.scene.enter('chitChatScene'))
bot.hears('Saved Intent', ctx => ctx.scene.enter('savedIntentScene'))

bot.startPolling()