var admin = require('firebase-admin')
var express = require('express');

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




//Registration


bot.command('hello').invoke(function (ctx) {
    return ctx.sendMessage('Hi welcome , may you please enter your number?' );
}).answer(function (ctx) {

    // Sets user answer to session.number
    ctx.session.number = ctx.answer;

    //display user telegram ID
    console.log(ctx.meta.user.id)

    addUserdetails(ctx.session.number, ctx.meta.user.id, ctx.meta.user.first_name, ctx.meta.user.last_name); //calling function addUserdetails
    
    return ctx.go('hi')
});



//store users number and Telegram ID in FIRESTORE

function addUserdetails(userId, name, firstName, lastName) {


    // Add a new user
    var itemsRef = ref.child("user details");
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
        return ctx.sendMessage('Hey! teach me your intent ?');
    })
    .answer(function (ctx) {
        ctx.session.memory = ctx.session.memory || '';
        ctx.session.memory += ctx.answer + ',';
        ctx.data.memory = ctx.session.memory;


        console.log(ctx.data.memory);

        addUserIntent(ctx.session.number, ctx.session.memory);
        return ctx.sendMessage('Thanks, your intent has been captured');
    })




// store users number and intent

function addUserIntent(userId, userIntent) {

    
    var itemsRef = ref.child("users intent ");
    var newItemRef = itemsRef.push();
    newItemRef.set({
        "msidn": userId,
        "user Intent": userIntent,
        "intent Created Time": new Date().toString()
    });

    var itemId = newItemRef.key;
    console.log("userID and intent " + itemId + " is successfully created.");
    return itemId;
}













