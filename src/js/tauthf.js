/*Getting and setting the API_KEY to use later on for t.getRestApi()*/
var apikey = undefined;
async function getEnv(envkey) {
   const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json());  
   envkey = '"' + envvar.apikey + '"'; 
   return envkey;                    
};
apikey = getEnv(apikey); 

/*Creating Trello iframe with Information needed for t.getRestApi()*/
var t = window.TrelloPowerUp.iframe({
    appKey: apikey,
    appName: "TestCard-PowerUp",
    appAuthor: "J D",
});

/*Render for popup size window*/
t.render(function(){
    return t.sizeTo("#content");
});


/*Define what happens on clicking the Button in the popup*/
var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", async function(){
    /*Section: Getting Card-ID*/
    var context = t.getContext();                                           //gives JSON-Resp with detailed information
    console.log(JSON.stringify(context, null, 2));                          //gives the correct Card Information
    console.log(context.card);  
    
    /*Section: Getting API-Key with Test*/
    var test = undefined; 
    var testkey = undefined;              
    const envvar = await fetch("/.netlify/functions/envvar")              //need this to get environemnt vars from netlify //env is set up
                    .then(envvar => envvar.json()).catch(err => console.error(err));
    testkey = envvar.testkey;
    //console.log("Testkey Value = " + testkey);                   //not needed anymore, ifelse is enough as test
    if(testkey == 101){                                            //test to check if testkey was defined
        test = true;
    } else {
        test = false;
    }
    console.log("process.env works: " + test); 

    /*Section: Getting Token and Test*/
    const tokenLooksValid = function(testtoken) {                         //from Trello Power Up Example from glitch
        // If this returns false, the Promise won't resolve.
        return /^[0-9a-f]{64}$/.test(testtoken);
      } 
    
    /*Section: creating the URL */
    //var URL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=' + envvar.apikey + '&token='; //?key=APIKey&token=APIToken'; 
    //'https://api.trello.com/1/cards/{id}/attachments?key=APIKey&token=APIToken'   //without API Key and API Token 401 error

    /*Section: Getting Token and making request*/
    t.getRestApi()
     .getToken()
     .then(function (token) {
        if (!token) {
            console.log("No Token given, do authorization")
        }
      //GET REQUEST for attachments with URL created above plus token
        //URL = URL + token + "'";
//     // make a request with token
        console.log("End of getToken!");
    });
                                                    
    return t.closePopup();                                  //call authorize at this point but for testing just close
});