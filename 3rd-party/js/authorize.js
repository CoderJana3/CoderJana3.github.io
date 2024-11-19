var username = document.getElementById("username");
var password = document.getElementById("password");
var authBtn = document.getElementById("authorize");
authBtn.addEventListener("click", async () => {
    console.log("got to 3rdParty authorize.js");   //try changing fetch post to fetch get and check if that method is also not allowed,
    const response = await fetch("/.netlify/functions/server", {              //without the dot in /.netlify/... it doesnt work    //(github pages)fetch get got the status 200 so worked fine
         method: "POST",                              
         headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
         },
        
        body:JSON.stringify({
            username: username.value,
            password: password.value,
        })                              
    }).then(//function(response){         
        response => response.json())    //JSON  is wrong cause it is not a function, the function is json()
        const resp = JSON.stringify(response); 
        console.log("Response Status:" + resp.statusCode);
        console.log("Token is: " + resp.token);
        if(window.opener && typeof window.opener.authorize ==="function"){
            window.opener.authorize(resp.token);
            console.log("set token to "+ resp.token);
        } else {
            sessionStorage.setItem("token", token);
            console.log("save token");
        }
        // setTimeout(function(){
        //     window.close();
        // }, 1*1000);
    //}); 
});

//forcepush