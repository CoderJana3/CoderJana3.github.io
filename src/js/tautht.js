/**Getting and setting the API_KEY to use for t.getRestApi()*/
async function getEnv() {
    /**Getting the APIKey saved in netlify environment Variables */
   const envvar = await fetch("/.netlify/functions/envvar")                     //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json());  
    var envkey = envvar.apikey;                                                 //save the apikey in var envkey to use it later on
                                                                                //as the apikey is already stringified in the Body of the response there is no need to 
                                                                                //use stringify again
   
   /**Creating Trello iframe with Information needed for t.getRestApi()*/
    var t = window.TrelloPowerUp.iframe({
        appKey: envkey,
        appName: "TestCard-PowerUp",
        appAuthor: "J D",
    });

    /**Render for popup size window*/
    t.render(function(){
        return t.sizeTo("#content");                                            //this could be nicer, check what options there are for render
    });

    /**Define what happens on clicking the Close Button in the Popup*/
    var closeBtn = document.getElementById("close");                            
    closeBtn.addEventListener("click", async function(){  

        /**Section: Getting Card-ID*/
        var context = t.getContext();                                           //gives JSON-Resp with detailed information
        console.log(JSON.stringify(context, null, 2));                          //gives the correct Card Information
        console.log("Card-ID:" + context.card);                                 //Test to check that the ID was correct

        /**Section:TokenTest Function Defintion*/
        const tokenLooksValid = function(testtoken) {                           //from Trello Power Up Example from glitch
            // If this returns false, the Promise won't resolve.
            return /^[0-9a-f]{63}$/.test(testtoken);                            //does not work right now ;(
        } 
        
        /**Section: start creating the URL */                                    //create a Base URL with the information that's already available, aka card ID and API Key
        var testURL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=';
        var URL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=' + envkey + '&token='; 
        //'https://api.trello.com/1/cards/{id}/attachments?key=APIKey&token=APIToken'   //without API Key and API Token 401 error

        /**Section: Getting Token and making request*/
        var gottoken = undefined;                                               //Test Variable to check that there was a Token returned
        var validtoken = false;                                                 //Test Variable to check if the Token that was returned is valid
        await t.getRestApi()                                                    //keep await here, so that log tests come out in correct order
        .getToken()                                                             
        .then(function (token) {
            if (!token) {                                                       //if no Token was returned
                console.log("No Token given, do authorization")                 //set gottoken to false and use log to inform User they need to authorize (maybe better)
                gottoken = false;                                               //to use alert here, not console.log
            } 
            validtoken = tokenLooksValid(token);                                //use tokenLooksValid to check if the token that was returned is Valid
            if(validtoken){     
                console.log("Got a valid token!");                              //If it is valid, set gottoken to true 
                gottoken = true;
                //GET REQUEST for attachments with URL created above plus token //and then make a Request with the Token
                URL = URL + token;                                              //use the URL created above for this
            } else {
                console.log("Not a valid Token");   
                gottoken = false;                                               //If it is invalid, set gottoken to false and inform over console.log that no Valid 
            } 
                                                                                //Token was found
            console.log("End of getToken!");                                    //Log to show that getToken was used 
        });
        console.log("getToken Test: " + gottoken);                              //Log to check if a valid Token was given
       //return t.closePopup();                                                 //close the Popup when the request has finished
    });



};

getEnv();                                                                       //Call getEnv() to allow all Functions to work


/**OLD CODE*/
// /*Creating Trello iframe with Information needed for t.getRestApi()*/
// var t = window.TrelloPowerUp.iframe({
//     appKey: apikey,
//     appName: "TestCard-PowerUp",
//     appAuthor: "J D",
// });

// /*Render for popup size window*/
// t.render(function(){
//     return t.sizeTo("#content");
// });

// /*Define what happens on clicking the Button in the popup*/
// var closeBtn = document.getElementById("close");
// closeBtn.addEventListener("click", async function(){
//     /*Section: Getting Card-ID*/
//     var context = t.getContext();                                           //gives JSON-Resp with detailed information
//     console.log(JSON.stringify(context, null, 2));                          //gives the correct Card Information
//     console.log(context.card);  
    
//     /*Section: Getting API-Key with Test*/
//     var test = undefined; 
//     var testkey = undefined;              
//     const envvar = await fetch("/.netlify/functions/envvar")              //need this to get environemnt vars from netlify //env is set up
//                     .then(envvar => envvar.json()).catch(err => console.error(err));
//     testkey = envvar.testkey;
//     //console.log("Testkey Value = " + testkey);                   //not needed anymore, ifelse is enough as test
//     if(testkey == 101){                                            //test to check if testkey was defined
//         test = true;
//     } else {
//         test = false;
//     }
//     console.log("process.env works: " + test); 

//     /*Section:TokenTest Function defintion*/
//     const tokenLooksValid = function(testtoken) {                         //from Trello Power Up Example from glitch
//         // If this returns false, the Promise won't resolve.
//         return /^[0-9a-f]{64}$/.test(testtoken);
//       } 
    
//     /*Section: creating the URL */
//     var testURL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=';
//     var URL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=' + envvar.apikey + '&token='; //?key=APIKey&token=APIToken'; 
//     //'https://api.trello.com/1/cards/{id}/attachments?key=APIKey&token=APIToken'   //without API Key and API Token 401 error

//     /*Section: Getting Token and making request*/
//     var gottoken = undefined;
//     var validtoken = false;
//     await t.getRestApi()
//      .getToken()
//      .then(function (token) {
//         if (!token) {
//             console.log("No Token given, do authorization")
//             gottoken = false;
//         } 
//         validtoken = tokenLooksValid(token);
//         if(validtoken){
//             console.log("Got a valid token!");
//             gottoken = true;
//             //GET REQUEST for attachments with URL created above plus token //maybe put this outside getToken, just save token?
//             //maybe just create URL in here, otherwise there's gonna be an ' in the definition(nope should work)
//             URL = URL + token;
//         // make a request with token
//         }
//         //console.log(testURL);
        
//         console.log("End of getToken!");
//     });
//     console.log("getToken Test: " + gottoken);
//     //in here should be all the code that's in tauthf.js right now for testing
//     return t.closePopup();
// });