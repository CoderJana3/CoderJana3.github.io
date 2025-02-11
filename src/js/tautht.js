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
    var reqBtn = document.getElementById("request");                            
    reqBtn.addEventListener("click", async function(){  

        /**Section: Getting Card-ID*/
        var context = t.getContext();                                           //gives JSON-Resp with detailed information
        console.log(JSON.stringify(context, null, 2));                          //gives the correct Card Information
        console.log("Card-ID:" + context.card);                                 //Test to check that the ID was correct

        /**Section:TokenTest Function Defintion*/
        var tokenForTest = "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f4";
        const tokenLooksValid = function(testtoken) {                           //from Trello Power Up Example from glitch
            // If this returns false, the Promise won't resolve.
            return /^[A-Za-z0-9]{63}$/.test(testtoken);
            //return /^[0-9a-f]{64}$/.test(testtoken);                            //does not work right now ;(
        }
        console.log("TokenLooksValid tested with tokenForTest. Did it work: " + tokenLooksValid(tokenForTest)); 
        
        /**Section: start creating the URL for GET Request for Attachments on Card */   
        //create a Base URL with the information that's already available, aka card ID and API Key
        var testURL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=';
        var URL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=' + envkey + '&token='; 
        //'https://api.trello.com/1/cards/{id}/attachments?key=APIKey&token=APIToken'   //without API Key and API Token 401 error

        /**Section: start creating the URL for GET Request for one Attachment on Card */
        var URLoneattach = 'https://api.trello.com/1/cards/' + context.card + '/attachments/';
        //'https://api.trello.com/1/cards/{id}/attachments/{idAttachment}?key=APIKey&token=APIToken'

        /**Section: Getting Token and making request*/
        var gottoken = undefined;   
        var gotvalidtoken = undefined;                                            //Test Variable to check that there was a Token returned
        var validtoken = false;                                                 //Test Variable to check if the Token that was returned is valid
        await t.getRestApi()                                                    //keep await here, so that log tests come out in correct order
        .getToken()                                                             
        .then(async function (token) {
            if (!token) {                                                       //if no Token was returned
                console.log("No Token given, do authorization")                 //set gottoken to false and use log to inform User they need to authorize (maybe better)
                gottoken = false;                                               //to use alert here, not console.log
            } 
            gottoken = true;
            validtoken = tokenLooksValid(token);                                //use tokenLooksValid to check if the token that was returned is Valid
            console.log("Test to see what we get back from using tokenLooksValid with a real Token in RESTAPI: " + validtoken);
            URL = URL + token; 
            await fetch(URL, {                     //maybe need await here? 
                method: 'GET',
                headers: {'Accept': 'application/json'}
                })
                .then(response => //{
                    response.json()
                    // console.log(
                    // `Response: ${response.status} ${response.statusText}`
                    // );
                    // return response.text();
               // }
            )
                //.then(text => console.log(text))
                .catch(err => console.error(err));
                // .catch(ReferenceError, function(){
                //     console.error();
                // });
            
            const resp = response;
            console.log("Attachment ID: " + resp.id);
            URLoneattach = URLoneattach ;
            // fetch('https://api.trello.com/1/cards/{id}/attachments/{idAttachment}?key=APIKey&token=APIToken', {
            //     method: 'GET',
            //     headers: {
            //       'Accept': 'application/json'
            //     }
            //   })
            //     .then(response => {
            //       console.log(
            //         `Response: ${response.status} ${response.statusText}`
            //       );
            //       return response.text();
            //     })
            //     .then(text => console.log(text))
            //     .catch(err => console.error(err));  

            if(validtoken){     
                console.log("Got a valid token!");                              //If it is valid, set gottoken to true 
                gotvalidtoken = true;
                //GET REQUEST for attachments with URL created above plus token //and then make a Request with the Token (get request taken from 
                //REST API Trello)
                URL = URL + token; 
                fetch(URL, {                     //maybe need await here? didn't try yet, try tomorrow 
                    method: 'GET',
                    headers: {'Accept': 'application/json'}
                  })
                  .then(response => {
                      console.log(
                        `Response: ${response.status} ${response.statusText}`
                      );
                      return response.text();
                    })
                    .then(text => console.log(text))
                    .catch(err => console.error(err));                                             //use the URL created above for this
            } else {
                console.log("Not a valid Token");   
                gotvalidtoken = false;                                               //If it is invalid, set gottoken to false and inform over console.log that no Valid 
            } 
                                                                                //Token was found
            console.log("End of getToken!");                                    //Log to show that getToken was used 
        });
        console.log("getValidToken Test: " + gotvalidtoken);                    //Log to check if a valid Token was given
        console.log("getToken Test: " + gottoken);                              //Log to check if a Token was given
       //return t.closePopup();                                                 //close the Popup when the request has finished
    });

    var closeBtn = document.getElementById("close");
    closeBtn.addEventListener("click", function(){
        return t.closePopup();
    })



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