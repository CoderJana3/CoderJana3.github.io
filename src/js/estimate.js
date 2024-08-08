console.log('Hello World!');

var t = TrelloPowerUp.iframe();

t.render(function (){
    t.sizeTo("#estimate").done();
});