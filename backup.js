
var axios = require('axios');

const admin = require('firebase-admin') ;
const firebaseHelper = require('firebase-functions-helper');


admin.initializeApp({
   credential: admin.credential.applicationDefault()
});

const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

var bb = require('bot-brother')
var bot = bb({
    key: '632216946:AAH0JL1223mNF-KC9q4VPP57hP-pxEmVqSg',
    sessionManager: bb.sessionManager.memory(),
    polling: { interval: 10, timeout: false }

})

//Check if user exist
bot.command('start')
.invoke((ctx) => {
    axios.get('http://91f1254b.ngrok.io/v1/userDetails/'+ ctx.meta.user.id)
    .then(response => {
        console.log(response.data)
        if(response.data.exists ===true){
            
            return ctx.go('default')
        }
        else{
           return ctx.go('yello')
        }
    })
    ctx.sendMessage('Sorry server currently down')
                return ctx.go('default')

})


//Registration
bot.command('yello').invoke(function (ctx) {

    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }], ["Cancel"]] 
        }
        
    };
    //Calling a user deatails function
    console.log(ctx.meta.user.phone_number);

  
    //bot.api.sendMessage(ctx.meta.chat.id, "Yello  " +ctx.meta.user.first_name + "  may you please register by entering your number", option)
    return ctx.sendMessage("Yello  " +ctx.meta.user.first_name + "  may you please register by entering your number", option)
    
    
}).answer(function (ctx) {

    //display user telegram ID
    console.log(ctx.meta.user.id)    
    console.log(ctx.message.contact.phone_number);
    return ctx.go('userintent')
})

//memory session (storing user Intent)
bot.command('userintent')
    .invoke(function (ctx) {
        return ctx.sendMessage('Hey! ' + ctx.meta.user.first_name +', what would you like to do today?');
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;

        console.log(ctx.data.memory);
        console.log(ctx.meta);
        addUserIntent(ctx)
        addUserDetails(ctx)
        return ctx.sendMessage('Thanks '+ ctx.meta.user.first_name+' , your selection has been captured');
        
    })

        .answer(function(ctx){
            return ctx.go('intent')
        });

//Ask a user if you wanna do anything else yes/no
bot.command('confirmation')
.invoke(function (ctx) {
  return ctx.sendMessage('Would you like to do something else? '+ ctx.meta.user.first_name)
})
.keyboard([
  [{'yes': {go:'default'}}],
  [{'No': {go: 'Bye'}}]
  
])


//bye commmand (closing a sessiom)
bot.command('bye').invoke(function (ctx) {
    return ctx.sendMessage('Bye ' + ctx.meta.user.first_name);
  });
 
 //Default Menu
 bot.command('defualt')
 .invoke(function (ctx) {
    return ctx.sendMessage('Would you like to do something else?' + ctx.meta.user.first_name)
 })
 .keyboard ([
    [{'Saved intent':{go:'typing'}}],
    [{'New Intent': {go: 'userintent'}}],
    [{'Chitchat': {go: 'typepromos'}}]
 ])
 
.answer(function (ctx) {
  ctx.data.answer = ctx.answer;
  return ctx.sendMessage('Your answer is <%=answer%>');
});
bot.command('bye').invoke(function (ctx) {
    return ctx.sendMessage('Bye ' + ctx.meta.user.first_name);
  });

  //Chit-chat 
  bot.command('chitchat')
  .invoke(function(ctx){

      
      return ctx.sendMessage('Ayoba ' + ctx.meta.user.first_name)
  })

  bot.command('promo')
   .invoke(function(ctx) {
       return axios.get('http://91f1254b.ngrok.io/processor/v1/promotions')
       .then((response) => {


           //console.log('i am here')
           console.log(response.data)
           ctx.sendMessage(response.data.advert)
           return ctx.go('chitchat');
       })

   })

// //keyboard function

    let defaultKeyboard = null

    function startingKeyboard(menu) {
        defaultKeyboard = menu
        console.log('This is the keyboard function')
        bot.keyboard(defaultKeyboard)

    }
//Send user intent to firestore
function addUserIntent(ctx) {
   let userData = {

       userData: ctx.session.memory,
       msidn : message.contact.phone_number

   }

   //posting data to the processor endpoint
console.log('posting intents')
   axios.post('http://91f1254b.ngrok.io/v1/saveUserIntents/', userData)
       .then(function (response) {
           console.log(response.data);

       })
       .catch(function (error) {

        ctx.sendMessage('sorry server currently down')
                return ctx.go('default')

       });
}

//posting user deatils to firestore
function addUserDetails(ctx) {
    let userInfor = {
 
        first_name : ctx.meta.user.first_name,
        last_name : ctx.meta.user.last_name,
        msidn : message.contact.phone_number,
        telegram_id :  ctx.meta.user.id
       
    }
    //posting data to the processor endpoint
    console.log('posting user deatils')
    axios.post('http://91f1254b.ngrok.io/v1/saveUserIntents/', userInfor)
        .then(function (response) {
            console.log(response.data);
 
        })
        .catch(function (error) {
            ctx.sendMessage('sorry server currently down')
            return ctx.go('yello')
        });
 }

 //chat action typing
bot.command('typing')
.invoke(function (ctx) {
    var USERID = ctx.meta.user.id
    var action = "typing";
    bot.api.sendChatAction(USERID, action).then(function (resp) {

        return ctx.go('getintent')
    })

});


//chat action typing for promo
bot.command('typepromos')
    .invoke(function (ctx) {
        var USERID = ctx.meta.user.id
        var action = "typing";
        bot.api.sendChatAction(USERID, action).then(function (resp) {
            return ctx.go('promo')
        })

    });

// get stored intent from processor, 'intent' command(retrieve existing user stored intent)
bot.command('getintent').invoke(function (ctx) {
    return axios.get('http://91f1254b.ngrok.io/v1/userIntents/' + ctx.message.contact.phone_number)
        .then((response) => {
 
            startingKeyboard(response.data)
            console.log('i am here')
            console.log(response.data)
 
        })
        .catch(function(error){
            ctx.sendMessage('sorry server currently down')
            return ctx.go('default')
           })|'''''''
        
 })
    
    
  