
var username = document.getElementById("usenam");
var password = document.getElementById("passw");
var authBtn = document.getElementById("authorize");
//var bicauthURL = "https://api.planbic.de/auth/login"
var bicauthURL = "/login.js"

authBtn.addEventListener("click", async() =>{
    if(username.value == "test"){
        console.log("Username was transmitted!");
    } else { console.log("No username submitted!")}
    
    if(password.value == "123"){
        console.log("Password was transmitted")
    } else { console.log("No password submitted!")}

    fetch(bicauthURL, {
        method: 'GET',
        headers: {
            'Accept': 'WWW-Authenticate'
        }
    }).catch(err => console.error(err));
    
})