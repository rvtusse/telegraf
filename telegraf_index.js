const Telegraf = require('telegraf')
const  tt = require("telegram-typings")
const Markup = require('telegraf/markup');
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const getIntentScene = require('./scenes/getIntentScene');
const savedIntentScene = require('./scenes/savedIntentScene');
const registerScene = require('./scenes/registerScene');
const engineScene = require('./scenes/engineScene');
//const promoScene = require('./scenes/promoScene');
const confirmationScene = require('./scenes/confirmationScene');
const keyboardScene = require('./scenes/keyboardScene');
const bot = new Telegraf("729223214:AAGADaHQrPvZav3gmQOE37X-cAEdg7t1x30");
var axios = require('axios');

// Create scene manager

const stage = new Stage()
stage.command('cancel', leave())

// Scene registration - Register all of the scenes here. 


stage.register(getIntentScene);
stage.register(registerScene);
stage.register(engineScene);
//stage.register(promoScene);
stage.register(confirmationScene);
stage.register(keyboardScene);
stage.register(savedIntentScene);


bot.use(session())
bot.use(stage.middleware());
// bot.command('greetingScene', (ctx) => ctx.scene.enter('greetingScene'));

bot.start(function (ctx) {

    //ctx.scene.enter('registerScene');
    ctx.reply("Y'ello! " + ctx.update.message.chat.first_name);
    axios.get('http://16592cec.ngrok.io/processor/v1/userDetails/' + ctx.chat.id)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exists, routing to the default menu.");
                
                ctx.session.contact_number = response.data.msdin
                ctx.scene.enter('getIntentScene');

                
            }
            else {
                console.log("[-] The user does not exist, routing to the registration scene.")
                ctx.scene.enter('registerScene');
            }

            bot.catch((err) => {
                console.log('Ooops', err)
                ctx.reply('ooops')
              })
        });
     
    
})


bot.hears("Get Started!", ctx => ctx.scene.enter("getIntentScene"));
bot.hears("Exit", ctx => ctx.reply("Bye  " +  ctx.update.message.chat.first_name));
bot.hears('New Intent', ctx => ctx.scene.enter('getIntentScene'));
//bot.hears('Promos', ctx => ctx.scene.enter('promoScene'));
bot.hears('Yes', ctx => ctx.scene.enter('getIntentScene'));
bot.hears('History', ctx => ctx.scene.enter('savedIntentScene'));
//bot.hears('Yes', ctx => ctx.scene.enter('engineScene'));
bot.hears("No", ctx => ctx.reply("Bye  " +  ctx.update.message.chat.first_name + '\nTo go back to main menu press /start'));

confirmationScene.hears('Yes', function(ctx) {
    ctx.reply('Would you like to do something else?', Markup
        .keyboard([
            ['History'],
            ['Promos'],
            ['exit']
          
        ])
        .oneTime()
        .resize()
        .extra()
    )
})

bot.startPolling()
