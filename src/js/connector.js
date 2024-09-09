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
            return [
        {
            //icon: needs to be a specific format 
            text: estimate || 'No estimate',
            color: estimate ? null : 'red' //still uses color blue even though its changed in the code... why?
        },   
        ];
        }); 
    },
});