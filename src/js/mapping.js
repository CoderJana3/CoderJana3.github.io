
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
        var checkArr = [];
        for(var key in JSONTestData){
            checkArr[i] = key;
            //console.log("This is the " + i + "Position of the checkArray and has: " + checkArr[i]);
            i++;
            if(key == "id"){
                console.log("Found matching Key: " + key);
                console.log("Value of matched Key: " + JSONTestData[key]);
            }
        };
        console.log("Data has ID: " + Object.hasOwn(JSONTestData, "id"));


        var stringJSONTEstData = JSON.stringify(JSONTestData);
        oldJSON.innerText += stringJSONTEstData;
        console.log(stringJSONTEstData);
        console.log(JSONTestData);
        console.log("JSONData Test, give out Data ID: " + JSONTestData.id);

        //**Needed parts of JSON */
        //id + referenceLink + isImported + creationUser

        const newJSON = {};
        for(let j=0; j<oldlength; j++){
            if(checkArr[j] == "id"){
                for(var key in JSONTestData){
                    if(key == "id"){
                        var id = JSONTestData[key];
                    }
                };
                newJSON.id = id;
            }
            if(checkArr[j] == "url"){
                for(var key in JSONTestData){
                    if(key == "url"){
                        var url = JSONTestData[key];
                    }
                };
                newJSON.referenceLink = url;
            }
            if(checkArr[j] == "member"){
                for(var key in JSONTestData){
                    if(key == "member"){
                        var member = JSONTestData[key];
                    }
                };
                newJSON.member = member;
            }
        }
        newJSON.isImported = "true";
        console.log("New JSON Object: " + newJSON);

        newJSON.innerText += JSON.stringify(newJSON);

       
});