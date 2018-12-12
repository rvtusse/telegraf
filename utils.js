

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
        posting data to the processor endpoint
    */
    axios.post('http://0b58526a.ngrok.io/processor/v1/saveUserDetails', userID)
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
    axios.post('http://0b58526a.ngrok.io/processor/v1/saveuserIntents', userIntent)
        .then(function (response) {
            console.log(response.data);
        })

}

module.exports = {
    addUserDetails: addUserDetails,
    addUserIntent: addUserIntent,
}
