//console.log('Hello World!');

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
            console.log('entered authorization-status in conenctor.js');
            console.log("AuthToken: " + authToken);
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
            callback: (function(t, opts){
                //const fetch = require('node-fetch');

                var context = t.getContext();
                console.log(JSON.stringify(context, null, 2));
                var URL = 'https://api.trello.com/1/cards/' + context.card + '/attachments?key=APIKey&token=APIToken'; //?key=APIKey&token=APIToken'; 
                //'https://api.trello.com/1/cards/{id}/attachments?key=APIKey&token=APIToken'   //without API Key and API Token 401 error
                console.log(URL);  
                
                // var all = t.getAll();
                // console.log(JSON.stringify(all, null, 2));
                var test = false;
                var testkey = process.env.API_Test_KEY;
                
                if(testkey == 101){
                    test = true;
                }
                console.log(test);

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


                //need to use Fetch to get ID and Attachments, probably can delete all the above 
                //check why name is available over opts and nothings else
               
                            
            })
            }
        }
     });
//});