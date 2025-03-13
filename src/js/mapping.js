
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

var alteredJSON = document.getElementById("newjson");

var addedJSON = document.getElementById("addedjson");

var mapbtn = document.getElementById("mapbtn");
mapbtn.addEventListener("click", async function(){

        fetch("https://api.planbic.de/tasks")
        .then(response=> {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }   
            return response.json();  
        })
        .then(data => console.log(data))
        .catch(error => console.error('Failed to fetch data:', error));
         
        //get Testdata from test.json
        var JSONTestData = await fetch('./src/json/test.json')            
        .then(response => response.json())
        .catch(error => console.error('Failed to fetch data:', error)); 

        //get length of JSON data
        var oldlength = Object.keys(JSONTestData).length;
        console.log("Length of OLDJSON: " + oldlength);

        //create Array with all keys in JSON Test Data 
        var i = 0;
        var checkArr = [];
        for(var key in JSONTestData){
            checkArr[i] = key;
            //console.log("This is the " + i + "Position of the checkArray and has: " + checkArr[i]);
            i++;
            // if(key == "id"){
            //     console.log("Found matching Key: " + key);
            //     console.log("Value of matched Key: " + JSONTestData[key]);
            // }
        };
        //console.log("Data has ID: " + Object.hasOwn(JSONTestData, "id"));

        //give out JSONTestData to check if it was given correctly
        var stringJSONTEstData = JSON.stringify(JSONTestData);
        oldJSON.innerText += stringJSONTEstData;
        console.log(stringJSONTEstData);
        console.log(JSONTestData);
        console.log("JSONData Test, give out Data ID: " + JSONTestData.id);

        //**Needed parts of JSON */
        //id + referenceLink + isImported + creationUser

        //create new JSON Object with only needed attributes and their values
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
            if(checkArr[j] == "idmember"){
                for(var key in JSONTestData){
                    if(key == "member"){
                        var member = JSONTestData[key];
                    }
                };
                newJSON.member = member;
            }
        }
        newJSON.isImported = "true";

        //show new JSON object to check if it was created correctly
        var stringnewJSON = JSON.stringify(newJSON);
        alteredJSON.innerText += stringnewJSON;
        console.log("New JSON Object: " + stringnewJSON);
        console.log(newJSON);

        //create new longer JSON Object to check if specific values can be altered to testvalues
        // const task = {};
        // task.id = "idnumber";
        // task.state = "state";
        // task.priority = "priority";
        // task.informedUsers = []; //works, creates an Arrays in task
        // task.lph = "LPH";
        // task.markup = {}; //works, creates another JSON object in task
        // //task.markup.id = "idnumbermarkup"; //works, like this able to add attributes to inner JSON Data
        // //task.markup.topic = "inner Array of Markup";
        // const markup = task.markup;   //works, no need to have long references just save in var to use later
        // markup.id = "idnumbermarkup";
        // markup.topic = {};
        // const topic = markup.topic;
        // topic.atGuid = null;
        // topic.atTopicType = null;
        // topic.referenceLink = "from data null so here be something else";

        // //adds value to attribute but doesn't change position of attribute
        // //for(let j=0; j<oldlength; j++){
        //   //  if(checkArr[j] == "id"){
        //         for(var key in JSONTestData){
        //             if(key == "id"){
        //                 var id = JSONTestData[key];
        //             }
        //             if(key == "url"){
        //                 var reflink = JSONTestData[key];
        //             }
        //         };
        //         task.markup.id = id;
        //         topic.referenceLink = reflink;
        //     //}

        // //}
        // //give out Task JSON Object
        // var taskstringified = JSON.stringify(task);
        // console.log(task);
        // console.log(taskstringified);
        // addedJSON.innerText += taskstringified;

       
});