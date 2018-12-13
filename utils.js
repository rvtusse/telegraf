

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
   ChatAction = 'typing'
    axios.post('http://15de0c9a.ngrok.io/processor/v1/saveUserDetails', userID)
        .then(function (response) {
            console.log(response.data);
        })

}
    /*
    ADDING USER INTENT TO FIRESTORE
    */
 function addUserIntent(ctx) {

    let userIntent = {
        msdin: ctx.session.contact_number,
        telegram_id: ctx.update.message.chat.id,

    }
    axios.post('http://15de0c9a.ngrok.io/processor/v1/saveuserIntents', userIntent)
        .then(function (response) {
            console.log(response.data);
        })

}
//FUNCTION TO SEND USER INPUT TO ENGINE SCENE 
function sendUserIntent(ctx) {

    let intent = {
        userData: ctx.session.intent

    }

    //SEND USER DATA TO HERVER END-POINT ENGINE SCENE
    getIntentScene.enter((ctx) => {

        axios.post('http://15de0c9a.ngrok.io/processor/v1/savedIntent/' + intent)
            .then(response => {

                //CALLING A KEYBOARD FUNCTION
                console.log(response.data)
                console.log(response);
                ctx.reply(response.data);
            })
        console.log(intent);
    })
}

module.exports = {
    addUserDetails: addUserDetails,
    addUserIntent: addUserIntent,
    sendUserIntent: sendUserIntent
}
