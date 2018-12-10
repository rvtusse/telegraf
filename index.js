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
    key: '631921524:AAE7kmnfwl5IZyq8lviJd1lxtPlGd9vHQ8M',
    sessionManager: bb.sessionManager.memory({ dir: '/Users/digital/datay.txt/' }),
    polling: { interval: 10, timeout: false }

})
// //if statement

bot.command('number')
.invoke((ctx) => {
    axios.get('http://b9b9cbee.ngrok.io/processor/v1/userDetails/'+ ctx.meta.user.id)
    .then(response => {
        console.log(response.data)
        if(response.data.exists ===true){
            console.log("[+] The user exists,routing to the default menu.")

            
            
            //return ctx.go('default')
            
        }
        else if (response.data.exists ===false) {
                console.log("[+] The user does not exists,routing to the number menu.")

                ctx.sendMessage('welcome back click on /number to go to the main menu')
                //return ctx.go('number')
            
        }
    })
    // .catch(function(error){
    //     ctx.sendMessage('server currently down')
    //     return ctx.go('default')
    })
   
     

//})







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
    return axios.get('http://b9b9cbee.ngrok.io/processor/v1/userIntents/' + ctx.message.contact.phone_number)
        .then((response) => {

            startingKeyboard(response.data)
            console.log('i am here')
            console.log(response.data)

        })
        .catch(function(error){
            ctx.sendMessage('server currently down')
            return ctx.go('default')
           })
        //    .answer(function (ctx) {
          
        // })
})






//calling addUserDetails
bot.command('n')
.invoke(function (ctx) {

    console.log('invoke')
    
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }], ["Cancel"]]
            

        }
        
    }; ctx.sendMessage("Y'ello "+ ctx.meta.user.first_name +  " may i have your number to register", option);
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
        return ctx.sendMessage("Number captured, "
        + "What would you like to do today");
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;
        //console.log(ctx.message.contact.phone_number);

    //calling addUserIntent
        addUserIntent(ctx);
        addUserDetails(ctx)
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
        return axios.get('http://b9b9cbee.ngrok.io/processor/v1/promotions')
            .then((response) => {


                console.log('i am here')
                console.log(response.data)
                //ctx.sendMessage(ctx.meta.user.first_name + '  did you know about this ?')
                ctx.sendMessage(response.data.advert)
                return ctx.go('chitchat')
            })
            .catch(function(error){
                ctx.sendMessage('server currently down')
                return ctx.go('default')
               })
            //    .answer(function (ctx) {
              
            // })

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
console.log('posting intents')
    axios.post('http://b9b9cbee.ngrok.io/processor/v1/saveUserIntents/', userData)
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function(error){
            ctx.sendMessage('server currently down')
            return ctx.go('default')
           })
        //    .answer(function (ctx) {
            
        // })
}




// store user details (phone number, telegram id, firstname, lastname)

function addUserDetails(ctx) {
    let userID = {
    msdin: ctx.message.contact.phone_number,
    telegram_id: ctx.meta.user.id,
    first_name: ctx.meta.user.first_name,
    last_name: ctx.meta.user.last_name

    
    }


    //posting data to the processor endpoint

    axios.post('http://b9b9cbee.ngrok.io/processor/v1/saveUserDetails', userID)
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function(error){
            ctx.sendMessage('server currently down')
            return ctx.go('default')
           })
          // .answer(function (ctx) {
         
       // })
}

