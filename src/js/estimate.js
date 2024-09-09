console.log('Hello World!');

var t = TrelloPowerUp.iframe();

t.render(function (){
    return t
    .get("card", "shared", "estimate")
    .then(function(estimate){
        window.estimateSize.value = estimate;
    })
    .then(function(){
        t.sizeTo("#estimate").done();
   });
    
});



window.estimate.addEventListener("submit", function(event){
    event.preventDefault(); //Stops the browser trying to submit the form itself
    return t
    .set("card", "shared", "estimate", window.estimateSize.value)
    .then(function() {
        t.closePopup();
    });
});


//method to check plugindata for eventlistener
/*const fetch = require('node-fetch');

fetch('https://api.trello.com/1/cards/XrvfP0qo/pluginData?key=APIKey&token=APIToken', {
  method: 'GET'
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));*/