
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



var mapbtn = document.getElementById("mapbtn");
mapbtn.addEventListener("click", async function(){
        //var JSONdata = await fetchJSONData(); 
        var JSONData = await fetch('./src/json/test.json')            //copied from https://www.geeksforgeeks.org/read-json-file-using-javascript/
        .then(response => {JSONData = response.json() }
         )
        .then(data => console.log(data))  
        .catch(error => console.error('Failed to fetch data:', error)); 

        console.log("JSONData Test, give out Data ID: " + JSONData.id);
        //console.log(JSONtest);
});