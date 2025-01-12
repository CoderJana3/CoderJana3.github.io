var t = window.TrelloPowerUp.iframe();

t.render(function(){
    return t.sizeTo("#content");
});

var closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function(){
    return t.closePopup();
});