var admin = require('firebase-admin')
var express = require('express');
var axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
//var serviceAccount = require("./key.json");
var firebase = require('firebase/app');
var functions = require('firebase-functions');
var firebaseHelper = require('firebase-functions-helper')
//var _ = require('lodash');



var bb = require('bot-brother')
var bot = bb({
    key: '795833285:AAGBmXjnQMdNzS31jDP7eeHCDmEqpReqTF8',
    sessionManager: bb.sessionManager.memory({ dir: 'Users/digital/datay.txt/' }),
    polling: { interval: 10, timeout: false }

})

//The start command is the first command that the user initiates a session with. 
//From here, we determine whether we should onboard the user or route them to registration.
bot.command('start')
    .invoke((ctx) => {
        console.log(ctx.meta.user.id);
        axios.get('http://b9b9cbee.ngrok.io/processor/v1/userDetails/' + ctx.meta.user.id)
            .then(response => {
                console.log(response.data)
                if (response.data.exists === true) {
                    console.log("[+] The user exists, routing to the default menu.")
                    // return ctx.go('default');
                    return ctx.sendMessage('Welcome back , ' + ctx.meta.user.first_name+ ' click on this command to start /default')
                }
                else{
                    console.log("[-] The user does not exist, routing to the number menu.")
                    // return ctx.go('number');
                    return ctx.sendMessage('Hi ' + ctx.meta.user.first_name + 'i see that your new here , may you click on /number command  to begin registration')
                }
            })

    })









//chat action typing

bot.command('typing')
    .invoke(function (ctx) {
        var USERID = ctx.meta.user.id
        var action = "typing";
        bot.api.sendChatAction(USERID, action).then(function (resp) {

            return ctx.go('getintent')
        })

    });



// //keyboard function

let defaultKeyboard = null

function startingKeyboard(menu) {
    defaultKeyboard = menu
    console.log('This is the keyboard function')
    bot.keyboard(defaultKeyboard)

}

// get stored intent from processor, 'intent' command(retrieve existing user stored intent)


// bot.command('getintent').invoke(function (ctx) {

//    ctx.sendMessage('Click on the keyboard to go to the shortcut quickly')

//    return bot.keyboard ([
//     [{'Airtime':{go:'savedIntents'}}],
//     [{'Data': {go: 'savedIntents'}}],
//     [{'Social Bundles': {go: 'savedIntents'}}]
//  ])


//     // return axios.get('http://b9b9cbee.ngrok.io/processor/v1/userIntents/' + ctx.message.contact.phone_number)
//     //     .then((response) => {

//     //         startingKeyboard(response.data)
//     //         console.log('i am here')
//     //         console.log(response.data)

//     //     })
//     //     .catch(function (error) {
//     //         ctx.sendMessage('server currently down')
//     //         return ctx.go('default')
//     //     })
//     //    .answer(function (ctx) {

//     // })
// })

 

// bot.command('savedIntents')
// .invoke((ctx) => {
//      return ctx.sendMessage('Your shortcut has been excuted')
    
     
//  })
//  return ctx.go('default')
//  .answer((ctx) => {
   
//  })


//calling addUserDetails
bot.command('number')
    .invoke(function (ctx) {

        console.log('invoke')
        var option = {
            "parse_mode": "Markdown",
            "reply_markup": {
                "one_time_keyboard": true,
                "keyboard": [[{
                    text: "My phone number",
                    request_contact: true
                }], ["Cancel"]],
            }

        };
        return ctx.sendMessage("Y'ello " + ctx.meta.user.first_name + " may i have your number to register", option).then(function(res, other){
            console.log("HERHEHRHEHREHRHER\n\n\n\n\\n\n\nHHHHHH");
            console.log(res);
            console.log(other);
            console.log(ctx.message.contact.phone_number);
        });
        console.log("fetched number");
        return ctx.go('default');
    })

    .answer(function (ctx) {
        //return  ctx.sendMessage('thanks')
        console.log('answer')
        console.log('answer phase')
        // addUserDetails(ctx)

        return bot.withContext(ctx.message.contact.phone_number, function (ctx) {
            return ctx.go('intent')
        });



    })

//memory session (storing user Intent)

bot.command('intent')
    .invoke(function (ctx) {
        return ctx.sendMessage("What would you like to do today");
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;
        //console.log(ctx.message.contact.phone_number);

        // //calling addUserIntent
        // addUserIntent(ctx);
        // addUserDetails(ctx)
        return ctx.sendMessage('Thanks, your request is being processed');
    })
    .answer(function (ctx) {
        return ctx.go('Confirmation');
    });


//Cornelius street


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
    console.log("here");
    console.log(ctx);
    return ctx.sendMessage('Yoh! ' + ctx.meta.user.first_name + ',' + ' what would you like to do now?')
})
.keyboard([
    // [{ 'saved intent': { go: 'typing' } }],
    [{ 'New intent': { go: 'intent' } }],
    [{ 'Promos': { go: 'typepromos' } }], 
    [{'Exit': {go: 'bye'}}]
])
.answer(function (ctx) {
    ctx.data.answer = ctx.answer;

});


//chat action typing 1 ONE 

bot.command('typepromos')
    .invoke(function (ctx) {
        var USERID = ctx.meta.user.id
        var action = "typing";
        bot.api.sendChatAction(USERID, action).then(function (resp) {
            return ctx.go('promos')
        })

    });


//promo  (getting promotional messages from the processor)

bot.command('promos')
    .invoke(function (ctx) {
        return axios.get('http://b9b9cbee.ngrok.io/processor/v1/promotions')
            .then((response) => {


                console.log('i am here')
                console.log(response.data)
                //ctx.sendMessage(ctx.meta.user.first_name + '  did you know about this ?')
                ctx.sendMessage(response.data.advert)
                return ctx.go('default')
            })
            .catch(function (error) {
                ctx.sendMessage('server currently down')
                return ctx.go('default')
            })
        //    .answer(function (ctx) {

        // })

    })


//chitchat command 

bot.command('chitchat')
    .invoke((ctx) => {
         ctx.sendMessage('You can find out more deals here ' + ctx.meta.user.first_name)
         return ctx.go('default')
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
    console.log('posting intents')
    axios.post('http://369067ff.ngrok.io/processor/v1/saveUserIntents/', userData)
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function (error) {
            ctx.sendMessage('server currently down')
            return ctx.go('default')
        })
    //    .answer(function (ctx) {

    // })
}




// store user details (phone number, telegram id, firstname, lastname)

