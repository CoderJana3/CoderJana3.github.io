var t = window.TrelloPowerUp.iframe();

t.render(function(){
    return t.sizeTo("#content");
});

//var oauthUrl = window.origin + "/3rd-party/authorize.html";
//var oauthUrl = "https://api.planbic.de/auth/login"
var oauthUrl = window.origin + "/bicauth.html";
var secURL = "https://app.planbic.de/login"

var authBtn = document.getElementById("authorize");
authBtn.addEventListener("click", function(){
    t.authorize(secURL)
    .then(function(token){
        return t.storeSecret('token', token);
        //return t.set("member", "private", "authToken", token);
    })
    .then(function(){
        return t.closePopup();
    });
});


