var t = window.TrelloPowerUp.iframe();

t.render(function(){
    return t.sizeTo("#content");
});

var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", function(){
    var context = t.getContext();                                           //gives JSON-Resp with detailed information
    console.log(JSON.stringify(context, null, 2));
    console.log(context.card);
    return t.closePopup();                                  //call authorize at this point but for testing just close
});