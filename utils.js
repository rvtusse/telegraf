

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

    //posting data to the processor endpoint
    axios.post('http://369067ff.ngrok.io/processor/v1/saveUserDetails', userID)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {      
            ctx.sendMessage('server currently down')
            return ctx.go('default')
        })
}

function demo(){

}

module.exports = {
    addUserDetails : addUserDetails,
    demo : demo,
}


//To call this in another file,
//
// utils.demo()

//or


// utils.addUserDetails()
//