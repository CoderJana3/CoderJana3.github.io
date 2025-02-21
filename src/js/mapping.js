
import * as data from '/src/json/test.json';
var JSONtest = data;

var mapbtn = document.getElementById("mapbtn");
mapbtn.addEventListener("click", function(){
        console.log(JSONtest);
});