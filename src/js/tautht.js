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
var closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function(){
    //in here should be all the code that's in tauthf.js right now for testing
    return t.closePopup();
});