const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const greetingScene = require('./scenes/greetingScene');
const defaultScene = require('./scenes/defaultScene');
const registerScene = require('./scenes/registerScene');
const newItentScene = require('./scenes/newIntentScene');
const savedIntentScene = require('./scenes/savedIntentScene')
const chitChatScene = require('./scenes/chiChatScene')
const bot = new Telegraf("795833285:AAGBmXjnQMdNzS31jDP7eeHCDmEqpReqTF8");
var axios = require('axios');

// Create scene manager
const stage = new Stage()
stage.command('cancel', leave())

// Scene registration - Register all of the scenes here. 
stage.register(greetingScene);
stage.register(defaultScene);
stage.register(registerScene);
stage.register(newItentScene)
stage.register(savedIntentScene)
stage.register(chitChatScene)


bot.use(session())
bot.use(stage.middleware());
bot.command('greetingScene', (ctx) => ctx.scene.enter('greetingScene'));

bot.start(function (ctx) {
    //ctx.scene.enter('registerScene');
    ctx.reply("Y'ello!");
    axios.get('http://3a889a71.ngrok.io/processor/v1/userDetails/' + ctx.chat.id)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exists, routing to the default menu.")
                ctx.scene.enter('newItentScene');
            }
            else {
                console.log("[-] The user does not exist, routing to the registration scene.")
                ctx.scene.enter('registerScene');
            }
        })
        
    })

bot.hears("Get Started!", ctx => ctx.scene.enter("defaultScene"));

bot.startPolling()