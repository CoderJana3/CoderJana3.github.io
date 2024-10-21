
exports.handler = async function(event, context) {
  const eventBody = event.Body
  const token = "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f"
  return {
    statusCode: 200,
    body: token
  }
}


// var cors = require('cors');
// const express = require('express');
// const serverless = require('serverless-http');
// const app = express();

// var corsOptions = {
//     origin: ['https://trello.com','https://coderjana3.github.io', 'https://coderjana3.netlify.app']
//   };
  
//   app.use(cors(corsOptions));

//   //app.use(express.static('/'));

//   app.post('/auth', function (request, response){
//     response.send({
//         token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
//     });
//   });

//   module.exports.handler = serverless(app);