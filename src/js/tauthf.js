var t = window.TrelloPowerUp.iframe();

t.render(function(){
    return t.sizeTo("#content");
});

var authBtn = document.getElementById("auth");
authBtn.addEventListener("click", function(){
    return t.closePopup();                                  //call authorize at this point but for testing just close
});