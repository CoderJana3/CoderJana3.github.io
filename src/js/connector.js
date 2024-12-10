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
            callback: function(t, opts){
                //opts erlaubt hier sofort Zugriff auf den Anhang der Karte bei welcher man die Funktion aufruft
                opts => opts.json();
                const ob = opts; 
                //const resp = opts.json();
                console.log("opts:" + opts.name);
                //console.log("Anhang ID: " + resp.id);
                console.log("Mime Type: " + ob.mimeType);
                console.log("Upload: " + opts.isUpload);
                const id = t.get("card", "shared", "id");
                console.log("Card ID: " + id);
                t.get('card', 'shared', 'id') //card is here enough because it's called on the card you use it on
                .then(function (data) {
                    console.log(JSON.stringify(data, null, 2));
                                               //error in this and next two lines somewhere check what
                t.get("member", "private", "authToken")
                .then(function(authToken){
                    const authT = authToken;
                });
                if(authT != null){
                    console.log("AuthToken: " + authT);
                    console.log("authorized");
                };
                
});
            }
        }
     }
});