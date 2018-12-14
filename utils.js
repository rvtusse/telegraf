

const axios = require('axios');

function addUserDetails(ctx) {
    /*
    Add a newly registered user to the firebase DB. 
    */

    let userID = {
        msdin: ctx.session.contact_number,
        telegram_id: ctx.update.message.chat.id,
        first_name: ctx.update.message.chat.first_name,
        last_name: ctx.update.message.chat.last_name
    }
    console.log(userID);

    /*
        Posting data to the processor endpoint
    */
    axios.post('http://560cd184.ngrok.io/processor/v1/saveUserDetails', userID)
        .then(function (response) {
            console.log(response.data);
        })

}
/*
ADDING USER INTENT TO FIRESTORE AND CALLING IT TO GET INTENT SCENE
*/
function addUserIntent(ctx) {

    let userIntent = {
        msdin: ctx.session.contact_number,
        intent: ctx.session.intent.text,
        telegram_id: ctx.update.message.chat.id


    }
    /*
    CONSOLE THE USER INPUT / TEXT TYPED ON THE KEYBOARD
    */
    console.log(userIntent.text);

    /*
    SEND USER INTENT TO SAVEUSER INTENTS END-POINT 
    */
    axios.post('http://560cd184.ngrok.io/processor/v1/saveuserIntents', userIntent)
        .then(function (response) {
            console.log(response.data);

        })

}

module.exports = {
    addUserDetails: addUserDetails,
    addUserIntent: addUserIntent,

}
