var username = document.getElementById("username");
var password = document.getElementById("password");
var authBtn = document.getElementById("authorize");
authBtn.addEventListener("click", function(){
    console.log("got to 3rdParty authorize.js");   //try changing fetch post to fetch get and check if that method is also not allowed,
    fetch("/.netlify/functions/server", {              //without the dot in /.netlify/... it doesnt work    //(github pages)fetch get got the status 200 so worked fine
         method: "POST",                              
         headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
         },
        
        body:JSON.stringify({
            username: username.value,
            password: password.value,
        })                              //fetch gets the repsonse from my server.js, so take-
    }).then(function(response){         // -another look at how to specify response body in functions & how to get the data from the response body
        //response => response.JSON();    //try to remove this and return in server.js just token as string
        const token = response.body.token; //maybe response.token here is why token is undefined? 
        console.log("Response Status: " + response.status);
        console.log("Token is: " + token);
        if(window.opener && typeof window.opener.authorize ==="function"){
            window.opener.authorize(token);
            console.log("set token to "+ token);
        } else {
            sessionStorage.setItem("token", token);
            console.log("save token");
        }
        // setTimeout(function(){
        //     window.close();
        // }, 1*1000);
    });
});

//forcepush