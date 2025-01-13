var t = window.TrelloPowerUp.iframe();

t.render(function(){
    return t.sizeTo("#content");
});



var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", function(){
    var context = t.getContext();                                           //gives JSON-Resp with detailed information
    console.log(JSON.stringify(context, null, 2));
    console.log(context.card);  
    
    var test = undefined; 
    async function getKey(envvar) {                                                     //env is set up
        envvar = await fetch("/.netlify/functions/envvar")              //need this to get environemnt vars from netlify 
                    .then(envvar => envvar.json());
        return envvar;
    };
    var envvar = undefined;
    envvar = getKey(envvar);
    
    
    if(envvar.testkey == 101){                                            //test to check if above function works
        test = true;
    } else {
        test = false;
    }
    console.log("process.env works:" + test); 


    const tokenLooksValid = function(testtoken) {                         //from Trello Power Up Example from glitch
        // If this returns false, the Promise won't resolve.
        return /^[0-9a-f]{64}$/.test(testtoken);
      }                                                     //get's the correct card callback
    return t.closePopup();                                  //call authorize at this point but for testing just close
});