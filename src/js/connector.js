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
     }
});