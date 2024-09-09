//console.log('Hello World!');

window.TrelloPowerUp.initialize({
    'card-buttons': function(t, options){
        //return an array at card-badges 
        return [{
            //icon:'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
            //icon: 'https://github.com/CoderJana3/testcard-powerup/blob/main/src/testicon.png',
            //icon: 'https://github.com/CoderJana3/CoderJana3.github.io/main/src/testicon.png', //https://github.com/CoderJana3/CoderJana3.github.io/blob/0b87e37974f133babff89a6d13ac16ecd7a84fae/src/testicon.png
            icon: 'https://github.com/CoderJana3/CoderJana3.github.io/blob/0b87e37974f133babff89a6d13ac16ecd7a84fae/src/testicon.png',
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
            icon: 'https://github.com/CoderJana3/CoderJana3.github.io/blob/0b87e37974f133babff89a6d13ac16ecd7a84fae/src/testicon.png',
            text: estimate || 'No estimate',
            color: estimate ? null : 'red'
        },   
        ];
        }); 
    },
});