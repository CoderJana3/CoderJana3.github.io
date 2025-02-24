
function fetchJSONData() { fetch('./src/json/test.json')            //copied from https://www.geeksforgeeks.org/read-json-file-using-javascript/
               .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }   
                    return response.json();  
                })
                .then(data => console.log(data))  
                .catch(error => console.error('Failed to fetch data:', error)); 
}


var oldJSON = document.getElementById("oldjson");



var newJSON = document.getElementById("newjson");

var mapbtn = document.getElementById("mapbtn");
mapbtn.addEventListener("click", async function(){
         
        var JSONTestData = await fetch('./src/json/test.json')            
        .then(response => response.json())
        .catch(error => console.error('Failed to fetch data:', error)); 

        var oldlength = Object.keys(JSONTestData).length;
        console.log("Length of OLDJSON: " + oldlength);
        var i = 0;
        for(var key in JSONTestData){
            if(key == "ID"){
                console.log(key);
                console.log(JSONTestData[key]);
            }
        };
        var stringJSONTEstData = JSON.stringify(JSONTestData);
        oldJSON.innerText += stringJSONTEstData;
        console.log(stringJSONTEstData);
        console.log(JSONTestData);
        console.log("JSONData Test, give out Data ID: " + JSONTestData.id);

        //**Needed parts of JSON */
        //id + referenceLink + isImported + creationUser

        var newJSON = {};
        // JSONTestData.forEach(element => {
        //     //do something
        //     newJSON[element] = JSONTestData[element];
        // });
        console.log("New JSON Object: " + newJSON);

       
});