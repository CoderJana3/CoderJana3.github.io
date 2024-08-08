console.log('Hello World!');

var t = TrelloPowerUp.iframe();

t.render(function (){
    return t
    .get("card", "shared", "estimate")
    .then(function(estimate){
        winwdow.estimateSize.value = estimate;
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