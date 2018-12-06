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
    sessionManager: bb.sessionManager.memory({ dir: '/Users/digital/datay.txt/' }),
    polling: { interval: 10, timeout: false }

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

    return ctx.sendMessage("Y'ello " + ctx.meta.user.first_name + "," + " may you please register with your phone number", option)
})
//calling addUserDetails
addUserDetails(ctx)

    .answer(function (ctx) {
        return ctx.go('intent')
    })


// store users number 

function addUserDetails(ctx) {
    let userData = {

        userData: ctx.message.contact.phone_number
    }


    //posting data to the processor endpoint

    axios.post('', userData)
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function (error) {

        });
}




//memory session (storing user Intent)

bot.command('intent')
    .invoke(function (ctx) {
        return ctx.sendMessage('What would you like to do today?');
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;
        //console.log(ctx.message.contact.phone_number);

    //calling addUserIntent
        addUserIntent(ctx);

        return ctx.sendMessage('Thanks, your request is being processed');
    })
    .answer(function (ctx) {
        return ctx.go('Confirmation');
    });

// store users intent

function addUserIntent(ctx) {
    let userIntents = {

        userIntents: ctx.session.memory
    }


    //posting data to the processor endpoint

    axios.post('', userIntents)
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function (error) {

        });
}

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
        return ctx.sendMessage('Yoh! ' + ctx.meta.user.first_name + ',' + ' what would you like to do now?')
    })
    .keyboard([
        [{ 'saved intent': { go: 'typingt' } }],
        [{ 'New intent': { go: 'intent' } }],
        [{ 'Chit-chat': { go: 'typepromos' } }]
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
        return axios.get('http://ec100a85.ngrok.io/processor/v1/promotions')
            .then((response) => {


                console.log('i am here')
                console.log(response.data)
                //ctx.sendMessage(ctx.meta.user.first_name + '  did you know about this ?')
                ctx.sendMessage(response.data.advert)
                return ctx.go('chitchat')
            })

    })


//chitchat command 

bot.command('chitchat')
    .invoke((ctx) => {
        return ctx.sendMessage('Sawubona ' + ctx.meta.user.first_name)
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
}

