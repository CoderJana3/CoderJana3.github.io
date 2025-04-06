
var username = document.getElementById("usenam");
var password = document.getElementById("passw");
var authBtn = document.getElementById("authorize");
//var bicauthURL = "https://api.planbic.de/auth/login"

authBtn.addEventListener("click", async() =>{
    if(username.value == "test"){
        console.log("Username was transmitted!");
    } else { console.log("No username submitted!")}
    
    if(password.value == "123"){
        console.log("Password was transmitted")
    } else { console.log("No password submitted!")}

    fetch("/login.js", {
        method: 'GET',
        headers: {
            'Accept': 'WWW-Authenticate'
        }
    })
})