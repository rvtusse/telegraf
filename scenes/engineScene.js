// > sent user intent to process layer (sent to me from getintentsene)

// > if user exists: diplay routes from before(ask user to confirm whether or not routes are correct)
//      < yes/No
//     <No ... default menu from wasps
//     <Yes... we sure

// > if user does not exist (display default menu from wasps) 
//     < clik on options
//     < record every keystroke  (ctx.session.keystoke)
//     < send keystoke once user is done



const Scene = require('telegraf/scenes/base')
const engineScene = new Scene('engineScene')
const axios = require('axios')


function DefaultMenuKeyboard(menu) {
    defaultKeyboard = menu
    console.log('This is the keyboard function')
    .keyboard(defaultKeyboard)

}




engineScene.enter(function (ctx) {

    axios.get('http://560cd184.ngrok.io/processor/v1/userDetails/' + ctx.session.intent)
        .then(response => {
            if (response.data.exists === true) {
                console.log("[+] The user exist.");
                ctx.session.contact_number = response.data.intent
                ctx.scene.enter('savedIntentScene');

            }
            else {

                console.log("[-] The user does not exist.")
                axios.get('http://560cd184.ngrok.io/processor/v1/userIntents/' + ctx.session.contact_number)      // display default menu from the wasps using axios.get
                .then(response => {
        
                    //CALLING KEYBOARD FUNCTION
                    DefaultMenuKeyboard(response.data)
                    console.log(response.data);
                   
        
                })

        
            }


        })


 });

 


module.exports = engineScene;