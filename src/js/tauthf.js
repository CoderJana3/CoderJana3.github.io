/** Getting and setting the API_KEY to use later on for t.getRestApi()*/

async function getEnv() {
   const envvar = await fetch("/.netlify/functions/envvar")                         //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json());   
    var envkey = envvar.apikey;                                                     //save the apikey in var envkey to use it later on
                                                                                    //as the apikey is already stringified in the Body of the response there is no need 
                                                                                    //to use stringify again

    /**Creating the iframe needed for Trello with all necessary Information */
    var t = window.TrelloPowerUp.iframe({
        appName: "TestCard-PowerUp",
        appKey: envkey,
        appAuthor: "J D",
    }); 

    /**Render for Popup Window */
    t.render(function(){
        return t.sizeTo("#content")
    });

    const testkeyNum = "g98374638a1caca81e18273764602015";
    const keyLooksValid = function(testK) {                                         //from Trello Power Up Example from glitch
        // If this returns false, the Promise won't resolve.
        return /^[A-Za-z0-9]{32}$/.test(testK);
    } 
    console.log("Test KeyLooksValid worked: " + keyLooksValid(testkeyNum));         //Test to see if the keyLooksValid Function works

    /**Define what happens on clicking the Button in the popup*/
    var authBtn = document.getElementById("auth");                                  //get the correct Button
    authBtn.addEventListener("click", async function(){                      
        console.log("Clicked Authorize Button!")  
        if(keyLooksValid(envkey)){                                                  //If a valid APIKey was given
            console.log("Valid Apikey!");
            t.getRestApi()                                                          //get a REST API Instance
             .authorize({expiration: "1hour", scope:"read"})                        //authorize with only Read access, expiration set to 1hour works, shown in settings
             .then(function(t){                                                     //however isAuthorized does not show that you are authorized
                    console.log("Successfully authorized!");                        //If Authorize worked alert User to successful authorization
                    alert("Success!");              
                    //return t.closePopup();   can't close the popup here                
                }).catch(TrelloPowerUp.restApiError.AuthDeniedError, function () {  //otherwise alert User to Error while authorizing
                        console.log("Error while authorizing: User denied Authorization");
                        alert("Cancelled!");
                    }); 
        } else {
            alert("No valid APIKey!");                                              //IF there is no valid APIKey alert the User 
        }                                
    
                                                    
    //return t.closePopup();                                                          //close the Popup                       
});
   
                   
};

getEnv();                                                       //Necessary, otherwise clicking the button doesnt work



/**OLD CODE, can probably be deleted */
// async function resEnv(){
//     const result = await getEnv()
//     return result
// }
// var promiseKey = "";
// var test = "Test is not a Promise";
// //(async()=> {test = await resEnv()})()              //wrapping ()around async and adding ()after it made it return a promise without await
//                                                     //adding await made it return test unchanged

// if(test instanceof Promise){
//     console.log("Test is a Promise")
// } else {
//     console.log(test)
// }
// getEnv().then((value) => {promiseKey = value});
// if(promiseKey instanceof Promise){
//     console.log("Promisekey is a Promise");
// } else if (promiseKey == ""){
//     console.log("PromiseKey is emptyString!");
// } else if(promiseKey != undefined){
//     console.log("PromiseKey is defined! ");
// } else {
//     console.log("PromiseKey is undefined!" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
// }

// const testtoken = "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f5"; 

// var apikey = "";
// var apikeypromise = Promise.resolve(getEnv(apikey));
// console.log("Resolve Promise Test: " + apikeypromise);
// apikeypromise.then((value) => {apikey = value});
// console.log("Resolve Promise Test 2: " + apikeypromise);
// // apikey = getEnv(apikey).then(function() {
// //     envkey = envvar.apikey;
// //     return envkey}); ; //for some reason this returns a promise, fulfilled but not just the value
// const isTestkey = keyLooksValid(testkeyNum);
// const isKey = keyLooksValid(apikey);
// console.log("valid TestKey: " + isTestkey + "\n" + "validKey: " + isKey);
/*Creating second EventListener for env Var*/
//var apikey = "";
// var content = document.getElementById("content");
// content.addEventListener("click", async function() {
//     console.log("Entered first click function!");
//     const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
//         .then(envvar => envvar.json())
//     apikey = JSON.stringify( envvar.apikey);
//     if(apikey instanceof Promise){
//         console.log("Apikey is a Promise");
//     } else if (apikey == ""){
//         console.log("APIKey is emptyString!");
//     } else if(apikey != undefined){
//         console.log("APIKey is defined! ");
//     } else {
//         console.log("APIKey is undefined!" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
//     }
//     //return apikey;
    
// })


/*Creating Trello iframe with Information needed for t.getRestApi()*/
// var t = window.TrelloPowerUp.iframe({
//     appName: "TestCard-PowerUp",
//     appKey: promiseKey,
//     appAuthor: "J D",
// });

// if(apikey instanceof Promise){
//     console.log("Apikey is a Promise (tauthf.js)");
// } else if (apikey == ""){
//     console.log("APIKey is emptyString! (tauthf.js)");
// } else if(apikey != undefined){
//     console.log("APIKey is defined! (tauthf.js)" + apikey);
// } else {
//     console.log("APIKey is undefined! (tauthf.js)" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
// }

/*Render for popup size window*/
// t.render(function(){
//     return t.sizeTo("#content");
// });


// /*Define what happens on clicking the Button in the popup*/
// var authBtn = document.getElementById("auth");
// authBtn.addEventListener("click", async function(){                       //try adding async/await for getRestApi -> should solve the Problem if it'S
//     console.log("Clicked Authorize Button!")  
//     const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
//         .then(envvar => envvar.json())
//    // btnkey = JSON.stringify( envvar.apikey);
//    btnkey = envvar.apikey;
//     if(btnkey instanceof Promise){
//         console.log("Apitestkey is a Promise (click btn)");
//     } else if (btnkey == ""){
//         console.log("APItestKey is emptyString! (click btn)");
//     } else if(btnkey != undefined){
//         console.log("APItestKey is defined! (click btn)");
//     } else {
//         console.log("APItestKey is undefined! (click btn)" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
//     }


//     if(keyLooksValid(btnkey)){
//         console.log("Valid Apikey!");
//         t.getRestApi()
//             .authorize({scope:"read"})
//            .then(function(t){
//                 console.log("Successfully authorized!");
//                 t.alert("Success!")
//                 return t.closePopup();
//             }).catch(TrelloPowerUp.restApiError.AuthDeniedError, function () {
//                     console.log("Error while authorizing: User denied Authorization");
//                      alert("Cancelled!");
//                 });
//     } else {
//         alert("No valid APIKey!");
//     }                                //waiting on object Promise it didn't
    
                                                    
//     //return t.closePopup();                                 //call authorize at this point but for testing just close
// });