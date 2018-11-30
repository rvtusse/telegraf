var admin = require('firebase-admin')
//var functions = require('firebase-functions')
var express = require('express');
var axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "//test-756a0.firebaseio.com/"
});

//get a database reference to the database

var db = admin.database();
var ref = db.ref("/");


var bb = require('bot-brother')
var bot = bb({
    key: '695673052:AAEB8WN5_JRB_QqfQ02dLm5tm1JC3iTvay0',
    sessionManager: bb.sessionManager.memory({ dir: '/Users/digital/datay.txt/' }),
    polling: { interval: 10, timeout: false }

})

//confirmation prompt message

bot.command('Confirmation')
    .invoke(function (ctx) {
        return ctx.sendMessage('Would you like to do something else?')
    })
    .keyboard([
        [{ 'Yes': { go: 'yes' } }],
        [{ 'No': { go: 'bye' } }]
    ])
    .answer(function (ctx) {
        ctx.data.answer = ctx.answer;
        return ctx.sendMessage('Your answer is <%=answer%>');
    });

//bye commmand (closing a sessiom)

bot.command('bye').invoke(function (ctx) {
    return ctx.sendMessage('Bye ' + ctx.meta.user.first_name);
});

//Yes command (Existing user keyboard)
bot.command('yes')
    .invoke(function (ctx) {
        return ctx.sendMessage('These are your options')
    })
    .keyboard([
        [{ 'saved intent': { go: 'intent' } }],
        [{ 'New intent': { go: 'hi' } }]
    ])
    .answer(function (ctx) {
        ctx.data.answer = ctx.answer;
        //return ctx.sendMessage('Your answer is <%=answer%>');
    });


//keyboard function

let defaultKeyboard = null

function startingKeyboard(menu) {
    defaultKeyboard = menu
    console.log('This is the keyboard function')
    bot.keyboard(defaultKeyboard)

}

// get stored intent from processor, 'intent' command(retrieve existing user stored intent)


bot.command('intent').invoke(function (ctx) {
    return axios.get('http://0da912ca.ngrok.io/processor/v1/actionRequest')
        .then((response) => {


            startingKeyboard(response.data)
            console.log('i am here')
            console.log(response.data)

        })
})








//greetings 

bot.texts({
    hello: {
        world: {
            friend: 'Hello, <%=name%>!'
        }
    }
});

bot.command('hey').invoke(function (ctx) {
    ctx.data.name = ctx.meta.user.first_name;
    ctx.sendMessage('hello.world.friend');
    return ctx.go('hello')
});


//Registration


bot.command('hello').invoke(function (ctx) {
    return ctx.sendMessage('May you please enter your number?');
}).answer(function (ctx) {

    // Sets user answer to session.number
    ctx.session.number = ctx.answer;

    //display user telegram ID
    console.log(ctx.meta.user.id)

    addUserdetails(ctx.session.number, ctx.meta.user.id, ctx.meta.user.first_name, ctx.meta.user.last_name); //calling function addUserdetails
    return ctx.sendMessage('Thanks, your number has been saved');
})
    .answer(function (ctx) {
        return ctx.go('hi');
    });




//store users number and Telegram ID in FIRESTORE

function addUserdetails(userId, name, firstName, lastName) {


    // Add a new user
    var itemsRef = ref.child("userDetails");
    var newItemRef = itemsRef.push();
    newItemRef.set({
        "msidn": userId,
        "Telegram ID": name,
        "First name": firstName,
        "Last name": lastName
    });

    var itemId = newItemRef.key;
    console.log("A new TODO item with ID " + itemId + " is created.");
    return itemId;
}



//memory session (storing user Intent)

bot.command('hi')
    .invoke(function (ctx) {
        return ctx.sendMessage('Please teach me your intent ?');
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;


        console.log(ctx.data.memory);


        addUserIntent(ctx);

        return ctx.sendMessage('Thanks, your intent has been captured');
    })
    .answer(function (ctx) {
        return ctx.go('Confirmation');
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

    // Add a new 'users' item
    var itemsRef = ref.child("userIntent ");
    var newItemRef = itemsRef.push();
    newItemRef.set({
        "msidn": ctx.meta.user.id,
        "user Intent": ctx.session.memory,
        "intent Created Time": new Date().toString()
    });

    var itemId = newItemRef.key;
    console.log("userID and intent " + itemId + " is successfully created.");
    return itemId;
}



//('start') determine if the user is new or old


        


       // return ctx.sendMessage('Please teach me your intent ?');
    

// function userstatus(name, firstName ) {

//     // Write and then read back a JavaScript object from the Database.
// ref.set({ name: ctx.meta.user.id, firstName: ctx.meta.user.first_name })
// .then(function() {
//  return ref.once("value");
// })
// .then(function(snapshot) {
//   var data = snapshot.val();
//   // data is { "name": "Ada", "age": 36 }
//   // data.name === "Ada"
//   // data.age === 36
// });

// userstatus

    


  

  