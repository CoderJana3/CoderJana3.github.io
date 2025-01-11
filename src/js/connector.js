//console.log('Hello World!');
/*Getting and setting the API_KEY to use later on for t.getRestApi()*/
var apikey = undefined;
async function getEnv(envkey) {
   const envvar = await fetch("/.netlify/functions/envvar")    //need this to get environemnt vars from netlify 
        .then(envvar => envvar.json());  
   envkey = '"' + envvar.apikey + '"'; 
   return envkey;                    
};
apikey = getEnv(apikey);                                                                               


window.TrelloPowerUp.initialize({
    'card-buttons': function(t, options){
        //return an array at card-badges 
        return [{
            
            //icon: needs to be a specific format
            text: 'Estimate Size',
            callback: function(t){
                return t.popup({
                    title: "Estimation",
                    url: "estimate.html",
                });
            },
        }];
    },
    'card-badges': function(t, options){
        return t.get("card", "shared", "estimate")
        .then(function(estimate){
            return [{
        
            //icon: needs to be a specific format 
            text: estimate || 'No estimate',
            color: estimate ? null : 'red' //finally worked after removing icon links???
        },];   //deleted comma between klammern
        
        }); 
    },
    'card-detail-badges': function(t, options){
        return t.get("card", "shared", "estimate")
        .then(function(estimate){
           // console.log(t.get("card", "shared", "estimate")); //get cardid from URL in browser; still check how to get it per code though
            console.log('functionestimate');
            return [{
                title:'Estimate',
                text: estimate || 'No estimate',
                color: estimate ? null : 'red',
                callback: function(t){
                    return t.popup({
                        title: 'Estimation',
                        url: "estimate.html"
                    });
                }
            }];
        }); 
     },
     'authorization-status': function(t, options){
        return t.get("member", "private", "authToken")
        .then(function(authToken){
            console.log('entered authorization-status in connector.js');
            //console.log("AuthToken: " + authToken);
            return {authorized: authToken != null}
            //return {authorized: true}; test
            
        });  
     },
     'show-authorization': function(t, options){
        console.log("entered show-authorization in connector.js")
        return t.popup({
            title: 'Authorize Test Account',
            url: './auth.html',
            height: 140,
        });
     }, 
     'save-attachment': function(t, options){
        console.log("entered save-attachment!");
        return {
            callback: (async function(t, opts){                     //async added because of the await fetch for API_KEY_TEST
                //const fetch = require('node-fetch');

                /* Section: Getting the Card-ID*/
                var context = t.getContext();                                           //gives JSON-Resp with detailed information
                console.log(JSON.stringify(context, null, 2));
                
                /*Section: Getting the API_KEY*/
                /*Just the test is here, the actual API_KEY needs to be defined outside intitialize, because
                it is used after when defining the appKey, appName and appAuthor to use t.getRestApi() */
                var test = false;                                                      //env is set up
                const envvar = await fetch("/.netlify/functions/envvar")              //need this to get environemnt vars from netlify 
                .then(envvar => envvar.json());

                if(envvar.testkey == 101){                                            //test to check if above function works
                    test = true;
                }
                console.log("process.env works:" + test);                               //to document if envvar test worked
                
                /* Section: Getting the Token */
                
                const testtoken = "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f5";       //test token for tokenlooksvalid
                const tokenLooksValid = function(testtoken) {                         //from Trello Power Up Example from glitch
                    // If this returns false, the Promise won't resolve.
                    return /^[0-9a-f]{64}$/.test(testtoken);
                  }
                console.log("Token test worked:" + tokenLooksValid(testtoken));     //to document if tokenloosvalid test worked(tokenlooksvalid is a function, 
                                                                                //so it needs an input to return a result)
                
                /*Section: creating the URL */
                var URL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=' + envvar.apikey + '&token=APIToken'; //?key=APIKey&token=APIToken'; 
                //'https://api.trello.com/1/cards/{id}/attachments?key=APIKey&token=APIToken'   //without API Key and API Token 401 error
                //console.log(URL);             //don't use anymore, secrets 
                console.log("Below should be logs from the testing section");
                /*Section: Getting the Attachments*/ 
                //  const response  = fetch(URL, {
                //  method: 'GET',
                //  headers: {
                //      'Accept': 'application/json'
                //  }
                //  })
                //  .then(response => {
                //      console.log(
                //      `Response: ${response.status} ${response.statusText}`
                //      );
                //      return response.text();
                //  })
                //  .then(text => console.log(text))
                //  .catch(err => console.error(err));

                /*Testing Section:*/
                const testkey1 = '"' + envvar.testkey + '"';
                const testkey2 = JSON.stringify(envvar.testkey);
                console.log("Test 1: " + testkey1, '\n', "Test 2: " + testkey2);

                const isAuth = null;
                function authorizedTest (t, auth) {
                    return t
                      .getRestApi()
                      .isAuthorized()
                      .then(function(authorized){
                        if(authorized){
                            auth = true;
                        } else {
                            auth = false;
                        }
                      });
                    };
                    isAuth = authorizedTest(t, isAuth);
                console.log("Client is authorized: " + isAuth);
                    


                /*Section: Junk, Things I tried that I don't need anymore prbly */
                //opts erlaubt hier sofort Zugriff auf den Anhang der Karte bei welcher man die Funktion aufruft
                //opts => opts.json();
                //const ob = opts; 
                //const resp = opts.json();
                //console.log("opts:" + opts.name);
                //console.log("Anhang ID: " + resp.id);
                //console.log("Mime Type: " + ob.mimeType);
                //console.log("Upload: " + opts.isUpload);
                //const id = t.get("card", "shared", "id");
                //console.log("Card ID: " + opts.id);
                //t.get('card', 'shared')                         //card is here enough because it's called on the card you use it on
                //.then(function (data) {
                   //console.log("card:" + card)                    
                   // console.log(JSON.stringify(data, null, 2));
                                        
                // t.get("member", "private", "authToken")
                // .then(function(authToken){
                //     var authT = authToken;
                // })
                // .catch(function(){
                //     console.log("unhandled Promise rejection");
                // });
                //  if(authT != null){                               //this causes an unhandled rejection error
                //      console.log("AuthToken: " + authT);            //with var authT in line111 it causes reference
                //      console.log("authorized");
                //  };

                
                //console.log(JSON.stringify(context.card));       //gives the "Card ID"
                //console.log(context.card);                          //gives the Card ID
                
                // var all = t.getAll();                            //gives PluginData
                // console.log(JSON.stringify(all, null, 2));

                //need to use Fetch to get ID and Attachments, probably can delete all the above 
                //check why name is available over opts and nothings else
               
                            
            })
            }
        },
     },
    {   
        appKey: apikey,
        appName: "TestCard-PowerUp",
        appAuthor: "J D",
    });
//});