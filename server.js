var cors = require('cors');
var express = require('express');
const app = express();
console.log("entered server.js");
//from Glitch tutorial
//app.use(compression());


app.use(cors({ origin: 'https://trello.com' }));
app.use(cors({origin: 'https://coderjana3.github.io/'}));

//From glitch tutorial
// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));

// listen for requests :)
// const listener = app.listen(process.env.PORT, function () {
//   console.info(`Node Version: ${process.version}`);
//   console.log('Trello Power-Up Server listening on port ' + listener.address().port);
// });

// var server = app.listen(3000, function () {
//     console.log('Server up and running...🏃🏃🏻');
//     console.log("Listening on port %s", server.address().port);
//   });

app.post("/auth", function(request, response){
    response.send({
        token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
    });
});

var server = app.listen(443, function(){ //found Portnumber through Remoteadress, still not working though
    console.log("Server up and running");
});


