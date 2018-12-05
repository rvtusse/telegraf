var admin = require('firebase-admin')
var express = require('express');
var axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var serviceAccount = require("./key.json");
var firebase = require('firebase/app');
//var _ = require('lodash');


//Firebase


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "//test-756a0.firebaseio.com/"
});

//get a database reference to the database

var db = admin.database();
var ref = db.ref("/");


var bb = require('bot-brother')
var bot = bb({
    key: '795833285:AAGBmXjnQMdNzS31jDP7eeHCDmEqpReqTF8',
    sessionManager: bb.sessionManager.memory({ dir: '/Users/digital/datay.txt/' }),
    polling: { interval: 10, timeout: false }

})


// //keyboard function

let defaultKeyboard = null

function startingKeyboard(menu) {
    defaultKeyboard = menu
    console.log('This is the keyboard function')
    bot.keyboard(defaultKeyboard)

}

// get stored intent from processor, 'intent' command(retrieve existing user stored intent)


bot.command('getintent').invoke(function (ctx) {
    return axios.get('http://516d0ec3.ngrok.io/processor/v1/userIntents/' + ctx.message.contact.phone_number)
        .then((response) => {


            //startingKeyboard(response.data)
            console.log('i am here')
            console.log(response.data)

        })
}) 






//Registration


bot.command('start').invoke(function (ctx) {

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
 
    //bot.api.sendMessage(ctx.meta.chat.id , " Y'ello " + ctx.meta.user.first_name + "," + " may you please register with your phone number", option)
  return ctx.sendMessage("Y'ello " + ctx.meta.user.first_name + "," + " may you please register with your phone number", option )
})
.answer(function (ctx) {

  return ctx.go('intent')
})
   //chat action typing

describe('#sendChatAction', function () {
    it('should send a chat action', function (done) {
      var bot = new Telegram(TOKEN);
      var action = "typing";
      bot.api.sendChatAction(USERID, action).then(function (resp) {
        resp.should.be.exactly(true);
        done();
      });
    });
  });
   




//memory session (storing user Intent)

bot.command('intent')
    .invoke(function (ctx) {
        return ctx.sendMessage('What would you like to do today?');
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;


        console.log(ctx.data.memory);


        // addUserIntent(ctx);

        return ctx.sendMessage('Thanks, your request is being processed');
    })
    .answer(function (ctx) {
        return ctx.go('Confirmation');
    });

//confirmation prompt message

bot.command('Confirmation')
    .invoke(function (ctx) {
        return ctx.sendMessage('Would you like to do something else?')
    })
    .keyboard([
        [{ 'Yes': { go: 'default' } }],
        [{ 'No': { go: 'bye' } }]
    ])
    .answer(function (ctx) {
        ctx.data.answer = ctx.answer;
        return ctx.sendMessage('Your answer is <%=answer%>');
    });

    //Yes command (Existing user keyboard)
    bot.command('default')
    .invoke(function (ctx) {
        return ctx.sendMessage('Welcome back! ' + ctx.meta.user.first_name +',' + ' what would you like to do now?')
    })
    .keyboard([
        [{ 'saved intent': { go: 'getintent' } }],
        [{ 'New intent': { go: 'intent' } }],
        [{ 'Chit-chat': {go: 'promos' }}]
    ])
    .answer(function (ctx) {
        ctx.data.answer = ctx.answer;
      
    });

    //promo  (getting promotional messages from the processor)

    bot.command('promos')
    .invoke(function(ctx) {
        return axios.get('http://7a0873c4.ngrok.io/processor/v1/promotions')
        .then((response) => {
           

            console.log('i am here')
            console.log(response.data)
            ctx.sendMessage(ctx.meta.user.first_name + '  did you know about this ?')
            ctx.sendMessage(response.data.advert)
            return ctx.go('chitchat')
        })

    })


    //chitchat command 
    bot.command('chitchat')
    .invoke((ctx)=>{
        return ctx.sendMessage('Awe ' + ctx.meta.user.first_name)
    })


        //bye commmand (closing a sessiom)

    bot.command('bye').invoke(function (ctx) {
        return ctx.sendMessage('Bye ' + ctx.meta.user.first_name);
    });



// store users number and intent

function addUserIntent(ctx) {
    let userData = {

        userData: ctx.session.memory
    }


    //posting data to the processor endpoint
    axios.post('http://0da912ca.ngrok.io/processor/v1/actionRequest', userData)
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function (error) {

        });

    // // Add a new 'users' item
    // var itemsRef = ref.child("userIntent ");
    // var newItemRef = itemsRef.push();
    // newItemRef.set({
    //     "msidn": ctx.meta.user.id,
    //     "user Intent": ctx.session.memory,
    //     "intent Created Time": new Date().toString()
    // });

    // var itemId = newItemRef.key;
    // console.log("userID and intent " + itemId + " is successfully created.");
    // return itemId;
}

