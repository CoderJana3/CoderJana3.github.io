
var username = document.getElementById("usenam");
var password = document.getElementById("passw");
var authBtn = document.getElementById("authorize");

authBtn.addEventListener("click", function(){
    if(username == "test"){
        console.log("Username was transmitted!");
    } else { console.log("No username submitted!")}
    
    if(password == "123"){
        console.log("Password was transmitted")
    } else { console.log("No password submitted!")}
})