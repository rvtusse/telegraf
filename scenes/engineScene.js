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
const addIntent = require('../utils');


let waspMenu1 = "";
let isMenuFirstAvailable;


engineScene.enter((ctx) => {
    console.log('engine ohoh')
    let startingMenu = {
        STRING: '*121#',
        MSISDN: ctx.session.contact_number,
        PDU: 'PSSRR'
    }
    axios.post('http://a44bccfe.ngrok.io/processor/v1/actionRequest', startingMenu)
        .then((response) => {
           //ctx.session.contact_number = response.data.msidn
            ctx.session.currMenu = response.data.STRING
            waspMenu1 = response.data.STRING;
            isMenuAvailable = true;
            ctx.reply(ctx.session.currMenu)
            console.log(response.data)

          
          
            console.log( ctx.session.contact_number)

            
        })
        
       
})
engineScene.hears("Exit", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + "\nTo go back to main menu press /menu"));
engineScene.hears("Back", ctx => ctx.reply("Bye " + ctx.update.message.chat.first_name + "\nTo go back to main menu press /menu"));
engineScene.hears('/menu', ctx => ctx.scene.enter('defaultmenuScene'));

engineScene.on('message', (ctx) => {

    
    
    let menuWASP =  ctx.session.currMenu
    for (var x = 0; x < menuWASP.length; x++) {

        if (menuWASP[x].startsWith(ctx.session.keystroke)) {

            whatistheusersnumberchoice = ctx.session.keystroke;
            whatistheuserstextchoice = menuWASP[x].replace(whatistheusersnumberchoice, "");

            //let userActionvalue = {whatistheusersnumberchoice : whatistheuserstextchoice}

        }

    }
    
//   //ctx.session.currMenu = response.data.STRING
//    let menuArrWASP =  menuWASP.split('\n')

//    console.log("++++++++========+++++")
//     console.log(menuWASP);


//     for (var i = 0; i <menuArrWASP.length; i++) {

//         console.log(menuArrWASP[i]);

//         //ctx.session.contact_number = response.data.msidn

//         console.log(menuArrWASP[i]);

//     }
     
   //let userStroke = 
   ctx.session.keystroke = ctx.session.keystroke || '',
    userStroke = ctx.session.keystroke += ctx.message.text +',';

   let userAction = ctx.session.keystrokeArr.push(userStroke)
   

    console.log(userAction)

    console.log(`user inputed ${ctx.message.text}`)
    console.log( ctx.session.contact_number)
    let userRequest = {
        STRING: ctx.message.text.substring(0,1),
        MSISDN: ctx.session.contact_number,
        PDU: 'USSRC'
    }
    console.log("++++++++++++++");
    console.log(userRequest)

    axios.post('http://a44bccfe.ngrok.io/processor/v1/actionRequest', userRequest)
        .then((response) => {
            
            if(response.data.PDU === 'PSSRC'){
               
                ctx.reply(response.data.STRING)
                addIntent.addUserIntent(ctx);
                console.log('successfull transaction')
            }
            else{

            ctx.session.currMenu = response.data.STRING
            //ctx.session.contact_number = response.data.msidn
            let waspArrMenu =  response.data.STRING.split('\n')
            
            

            let hasFoundOption = false;
            for (var i = 0; i < waspArrMenu.length; i++) {
                

                
                // console.log("herve")
                // console.log(waspArrMenu[i]);
                
                if(waspArrMenu[i].startsWith(ctx.session.keystroke))
                {
                    hasFoundOption = true;
                    console.log("]]]2344511111mfnnbnbnbnbmvmvmvm=====6666========");
                    console.log(waspArrMenu[i]);
                    let tempOptionArray = waspArrMenu[i].split(" ");
                    ctx.session.split =  tempOptionArray[1]
                    ctx.session.intents = ctx.session.keystroke+":"+tempOptionArray[1];
                    ctx.session.intent = ctx.session.keystroke
                    console.log("======WE=======ARE======HERE")
                    console.log(ctx.session.intents);
                    console.log(tempOptionArray[1])

                }

            }

            console.log("Checking the DATA RESP");
            console.log(response.data);
            // if(response.data.STRING = 'undefined'){
            //     ctx.reply('I dont seem to find your option please try again')
            //     ctx.scene.enter('engineScene');
            // }
           
                ctx.reply(response.data.STRING);
                // if (response.data.PDU === "PSSRC") {
                   
                //     addIntent.addUserIntent(ctx);
                //     console.log('intent saved...');
                    
    
                // }


            }

            

            

            
        })
})
// .catch(error => {
//     console.log("RESPOnse ERRRrrrrr ====");
//     ctx.reply(error)
//     ctx.reply('press menu / menu')

//
























module.exports = engineScene;