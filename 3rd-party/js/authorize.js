var username = document.getElementById("username");
var password = document.getElementById("password");
var authBtn = document.getElementById("authorize");
authBtn.addEventListener("click", function(){
    console.log("got to 3rdParty authorize.js");   //try changing fetch post to fetch get and check if that method is also not allowed,
    fetch("/auth", {  
         method: "GET",                              // don't know if it would help anything but can't hurt to try
         headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
         },
        
        // body:JSON.stringify({
        //     username: username.value,
        //     password: password.value,
        // })
    }).then(function(response){
        const token = response.token;
        console.log("token: " + token);
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