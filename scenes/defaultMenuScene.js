
const Scene = require('telegraf/scenes/base')
const DefaultMenuScene= new Scene('DefaultMenuScene')
const axios = require('axios')







function DefaultMenuKeyboard(menu) {
    defaultKeyboard = menu
    console.log('This is the keyboard function')
    .keyboard(defaultKeyboard)

}

 axios.get('http://16592cec.ngrok.io/processor/v1/userInt/' + ctx.session.contact_number + '/' + ctx.session.intent.text)      // display default menu from the wasps using axios.get
 .then(response => {

     //CALLING KEYBOARD FUNCTION
     //DefaultMenuKeyboard(response.data)
     console.log(response.data);
    

 })




 module.exports = DefaultMenuScene;