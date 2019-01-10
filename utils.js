//HAVE TWO FUNCTIONS, addUserDetails AND addUserIntent

const axios = require('axios');

function addUserDetails(ctx) {
    /*
    Add a newly registered user to the firebase DB. 
    */

    let userID = {
        msidn: ctx.session.contact_number,
        telegram_id: ctx.update.message.chat.id,
        first_name: ctx.update.message.chat.first_name,
        last_name: ctx.update.message.chat.last_name
    }
    console.log(userID);
    
    /*
        Posting data to the processor endpoint
    */
    axios.post('https://processor-module.firebaseapp.com/processor/v1/saveUserDetails', userID)
        .then(function (response) {
            console.log(response.data);
        })

}
/*
ADDING USER INTENT TO FIRESTORE AND CALLING IT TO (GET_INTENT_SCENE)
*/
function addUserIntent(ctx) {
    let userRequest = {
        STRING: ctx.message.text,
        MSISDN: ctx.session.contact_number,
        PDU: 'USSRC'
    }
    console.log("++++++++++++++");
    console.log(userRequest)

    axios.post('http://f048f2b5.ngrok.io/processor/v1/actionRequest', userRequest)
        .then((response) => {
    let menuWASP = response.data.STRING
            for (var x = 0; x < menuWASP.length; x++){

                if (menuWASP[x].startsWith(ctx.session.keystroke)){
            
                    var whatistheusersnumberchoice = ctx.session.keystroke;//
                    
                    var whatistheuserstextchoice = menuWASP[x].replace(ctx.session.keystroke, "");//
                    console.log("User sent us: "+whatistheusersnumberchoice.toString());
                    console.log("The text is: "+whatistheuserstextchoice);
                    //var finalPush = {};
                   // finalPush[ctx.session.keystroke] = whatistheuserstextchoice
                    
                }
            }

    

let userIntent = {
    msidn: ctx.session.contact_number,
    intent: `[${ctx.session.intent}, { ${ctx.session.keystroke}: ${menuWASP[x].replace(ctx.session.keystroke, "")}}]`,
    telegram_id: ctx.update.message.chat.id,

    
}
    /*
    CONSOLE THE USER INPUT / TEXT TYPED ON THE KEYBOARD
    */
    console.log(userIntent.text);
    /*
    SEND USER INTENT TO SAVEUSER INTENTS END-POINT 
    */
    axios.post('https://processor-module.firebaseapp.com/processor/v1/saveuserIntents', userIntent)
        .then(function (response) {
            console.log(response.data);

        })
    })

}


module.exports = {
    addUserDetails: addUserDetails,
    addUserIntent: addUserIntent,

}
