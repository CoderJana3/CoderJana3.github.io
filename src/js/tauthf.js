/*Getting and setting the API_KEY to use later on for t.getRestApi()*/

async function getEnv(envkey) {
   const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json()); 
    //console.log("Testkey " + envvar.testkey);
    //envkey = '"' + envvar.apikey + '"'; 
    envkey = JSON.stringify( envvar.apikey);        //gets the value
    //console.log(envkey);  
    return envkey;                    
};

// const testtoken = "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f5"; 
const testkeyNum = "g98374638a1caca81e18273764602015";
const keyLooksValid = function(testK) {                         //from Trello Power Up Example from glitch
    // If this returns false, the Promise won't resolve.
    return /^[A-Za-z0-9]{32}$/.test(testK);
  } 
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
var apikey = "";
var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", async function() {
    console.log("Entered first click function!");
    const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json())
    apikey = JSON.stringify( envvar.apikey);
    if(apikey instanceof Promise){
        console.log("Apikey is a Promise");
    } else if (apikey == ""){
        console.log("APIKey is emptyString!");
    } else if(apikey != undefined){
        console.log("APIKey is defined! ");
    } else {
        console.log("APIKey is undefined!" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
    }
    //return apikey;
    
})


/*Creating Trello iframe with Information needed for t.getRestApi()*/
var t = window.TrelloPowerUp.iframe({
    appName: "TestCard-PowerUp",
    appKey: apikey,
    appAuthor: "J D",
});

if(apikey instanceof Promise){
    console.log("Apikey is a Promise");
} else if (apikey == ""){
    console.log("APIKey is emptyString!");
} else if(apikey != undefined){
    console.log("APIKey is defined! " + apikey);
} else {
    console.log("APIKey is undefined!" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
}

/*Render for popup size window*/
t.render(function(){
    return t.sizeTo("#content");
});


/*Define what happens on clicking the Button in the popup*/
//var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", async function(){                       //try adding async/await for getRestApi -> should solve the Problem if it'S
    console.log("Clicked Authorize Button!")  
    const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json())
    var apikey = JSON.stringify( envvar.apikey);
    if(apikey instanceof Promise){
        console.log("Apitestkey is a Promise");
    } else if (apikey == ""){
        console.log("APItestKey is emptyString!");
    } else if(apikey != undefined){
        console.log("APItestKey is defined! " + apikey);
    } else {
        console.log("APItestKey is undefined!" + "\n" + "appName: " + t.appName + "\n" + "appAuthor: " + t.appAuthor);
    }


    if(keyLooksValid(apikey)){
        await t.getRestApi()
               .authorize({scope:"read"})
               .then(function(t){
                    console.log("Successfully authorized!");
                     t.alert("Success!")
                    return t.closePopup();
        
                 }).catch(TrelloPowerUp.restApiError.AuthDeniedError, function () {
                        console.log("Error while authorizing: User denied Authorization");
                         alert("Cancelled!");
                    });
    } else {
        alert("No valid APIKey!");
    }                                //waiting on object Promise it didn't
    
                                                    
    //return t.closePopup();                                 //call authorize at this point but for testing just close
});