//CHECK IF USER EXIST IN OUR DATABASE OR NOT


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
const promoScene = require('./scenes/promoScene');
const defaultmenuScene = require('./scenes/defaultmenuScene');
const confirmationScene = require('./scenes/confirmationScene');
const bot = new Telegraf("730221015:AAGgNd7Iv-WV7oeYcgPj9gDdmvEoqx0WjhQ");
var axios = require('axios');

// Create scene manager

const stage = new Stage()
stage.command('cancel', leave())

// Scene registration - Register all of the scenes here. 


stage.register(getIntentScene);
stage.register(registerScene);
stage.register(engineScene);
stage.register(promoScene);
stage.register(confirmationScene);
stage.register(defaultmenuScene);
stage.register(savedIntentScene);


bot.use(session())
bot.use(stage.middleware());


bot.start(function (ctx) {

    ctx.reply("Y'ello! " + ctx.update.message.chat.first_name);
    axios.get('https://processor-module.firebaseapp.com/processor/v1/userDetails/' + ctx.chat.id)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exists, routing to the default menu.");
                console.log(response.data.msidn)
                
                 ctx.session.contact_number = response.data.msidn
                ctx.scene.enter('defaultmenuScene');

                
            }
            else {
                console.log("[-] The user does not exist, routing to the registration scene.")
                ctx.scene.enter('registerScene');
            }
           
        });
        
        //COMMENTED THE ERROR MESSGAGE BECAUCE IT'S SHOWS UP IN A WRONG PLACE , STILL NEED TO BE SORTED OUT
        

        // .catch(err => console.log(err))
        // ctx.reply('Ooops!!, the service is currently down please try again in 5 minutes'+ '\nTo go back to main menu press /start') 
      
     
       
}) 

 

 

bot.hears("Get Started!", ctx => ctx.scene.enter("getIntentScene"));
bot.hears("Exit", ctx => ctx.reply("Bye  " +  ctx.update.message.chat.first_name));
bot.hears('New Intent', ctx => ctx.scene.enter('getIntentScene'));
bot.hears('Promos', ctx => ctx.scene.enter('promoScene'));
bot.hears('Yes', ctx => ctx.scene.enter('getIntentScene'));
bot.hears('History', ctx => ctx.scene.enter('savedIntentScene'));
bot.hears('Yes', ctx => ctx.scene.enter('defaultScene'));
bot.hears("No", ctx => ctx.reply("Bye  " +  ctx.update.message.chat.first_name + '\nTo go back to main menu press /start'));






bot.startPolling()

