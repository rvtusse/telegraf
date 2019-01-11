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

    axios.post('http://a44bccfe.ngrok.io/processor/v1/actionRequest', userRequest)
        .then((response) => {
            ctx.session.contact_number = response.data.msidn
            var whatistheusersnumberchoice;
              
            
            
            let menuWASP = response.data.STRING
            for (var x = 0; x < menuWASP.length; x++) {

                if (menuWASP[x].startsWith(ctx.session.keystroke)) {
                    let tempOptionArray = menuWASP[x].split(")");
                    ctx.session.split = tempOptionArray[1]
                    ctx.session.textchoice = menuWASP[x].split(")");
                    ctx.session.intents = ctx.session.keystroke+":"+tempOptionArray[1];
                    whatistheusersnumberchoice = ctx.session.keystroke;
                    whatistheuserstextchoice = menuWASP[x].replace(whatistheusersnumberchoice, "");

                    // let userActionvalue = {whatistheusersnumberchoice : whatistheuserstextchoice}
                    console.log("====56=====");
                    console.log(tempOptionArray)
                    console.log("======WE=======ARE======HERE")
                    console.log(ctx.session.intents);
                    console.log(tempOptionArray[1])
                }

            }

            //let id = tempOptionArray;

       
            let userIntent = {
                msidn: ctx.session.contact_number,
                intent: [[ctx.session.keystrokeArr+"{"+ ctx.session.split+"}"]] ,
                telegram_id: ctx.update.message.chat.id,


            }
            /*
            CONSOLE THE USER INPUT / TEXT TYPED ON THE KEYBOARD
            */
           console.log(userIntent)
            
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
