
fetchJSONData() = fetch('./sample.json')
               .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }   
                    return response.json();  
                })
                .then(data => console.log(data))  
                .catch(error => console.error('Failed to fetch data:', error)); 

var JSONtest = fetchJSONData(); 

var mapbtn = document.getElementById("mapbtn");
mapbtn.addEventListener("click", function(){
        console.log(JSONtest);
});