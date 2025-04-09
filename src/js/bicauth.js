
var username = document.getElementById("usenam");
var password = document.getElementById("passw");
var authBtn = document.getElementById("authorize");
var bicauthURL = "https://api.planbic.de/auth/login"
var bicauthURLlog = "/login.js" //redirect is unneccessary because it still causes CORS error 
// Quellübergreifende (Cross-Origin) Anfrage blockiert: Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource auf 
// (Grund: CORS-Anfrage schlug fehl). Statuscode: (null).
var bicauthURL2 = "/auth/login"

authBtn.addEventListener("click", async() =>{
    if(username.value == "test"){
        console.log("Username was transmitted!");
    } else { console.log("No username submitted!")}
    
    if(password.value == "123"){
        console.log("Password was transmitted")
    } else { console.log("No password submitted!")}

    // fetch(bicauthURLlog, {
    //     method: 'GET',
    //     // headers: {
    //     //     'Accept': 'WWW-Authenticate'
    //     // }
    // }).catch(err => console.error("login.js "+err));

    fetch(bicauthURL, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'www.api.planbic.de'
        },
        body:{
            username:username,
            password:password
        }
    }).catch(err => console.error("auth/login "+ err));

    // const resp = fetch(bicauthURL, {
    //     method: 'POST',
    //     headers: {
    //         'Access-Control-Allow-Origin': 'www.api.planbic.de'
    //     },
    //     body:{
    //         username:username,
    //         password:password
    //     }
    // }).then(response => response.json())
    //   .catch(err => console.error("auth/login "+ err));

    // if(window.opener && typeof window.opener.authorize ==="function"){
    //     window.opener.authorize(resp.token);
    //     console.log("set token to "+ resp.token);
    // } else {
    //     sessionStorage.setItem("token", resp.token);
    //     console.log("save token");
    // }
    //  setTimeout(function(){
    //      window.close();
    //  }, 1*1000);
    
})