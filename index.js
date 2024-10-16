var cors = require('cors');
var express = require('express');
const app = express();
console.log("entered server.js");
//from Glitch tutorial
//app.use(compression());

var corsOptions = {
  origin: ['https://trello.com','https://coderjana3.github.io']
};

app.use(cors(corsOptions));
// app.use(cors({ origin: 'https://trello.com' }));
// app.use(cors({origin: 'https://coderjana3.github.io/3rd-party/authorize.html'}));

//From glitch tutorial
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('/'));
//app.use(express.json());


app.get("/auth", function(req, res){
  res.send({
        token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
      });
});
// app.route('/auth').all(function (req, res, next){}).get(function (req, res, next){
//   console.log("Get Request Accepted");
//   res.send({
//     token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
//   })
// }).post(function (req, res, next){
//   res.json({
//     token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
//   })
// });

// app.use('/auth', function(request, response){
//   response.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
//   console.log("setHeader");
// });

// app.post('/auth', function (request, response){
//     console.log("sending response in server.js");
//     // response.send({
//     //     token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
//     // });
// });

//listen for requests :)
// const listener = app.listen(process.env.PORT, function () {
//   console.info(`Node Version: ${process.version}`);
//   console.log('Trello Power-Up Server listening on port ' + listener.address().port);
// });

// var server = app.listen(3000, function () {
//     console.log('Server up and running...🏃🏃🏻');
//     console.log("Listening on port %s", server.address().port);
//   });

// app.all("/auth", function(request, response){
//     console.log("entered app.all in server.js");
//     response.send({
//         token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
//     });
// });



// var server = app.listen(443, function(){ //found Portnumber through Remoteadress, still not working though
//     console.log("Server up and running", server.address().port);
// });


