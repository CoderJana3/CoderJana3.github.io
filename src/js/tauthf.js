/*Getting and setting the API_KEY to use later on for t.getRestApi()*/
var apikey = undefined;
async function getEnv(envkey) {
   const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json());  
    console.log("Testkey " + envvar.testkey);
   //envkey = '"' + envvar.apikey + '"'; 
   return envkey;                    
};
apikey = getEnv(apikey); 

/*Creating Trello iframe with Information needed for t.getRestApi()*/
var t = window.TrelloPowerUp.iframe({
    appKey: '"' + apikey + '"',
    appName: "TestCard-PowerUp",
    appAuthor: "J D",
});

/*Render for popup size window*/
t.render(function(){
    return t.sizeTo("#content");
});


/*Define what happens on clicking the Button in the popup*/
var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", function(){
    console.log("Not Authorized!")
    t.getRestApi()
    .authorize({scope:"read"})
    .then(function(t){
        console.log("Successfully authorized!");
        t.alert("Success!")
        return t.closePopup();
        
    }).catch(TrelloPowerUp.restApiError.AuthDeniedError, function () {
        console.log("Error while authorizing: User denied Authorization");
        alert("Cancelled!");
      });
                                                    
    //return t.closePopup();                                 //call authorize at this point but for testing just close
});