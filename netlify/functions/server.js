var cors = require('cors');
var express = require('express');
const app = express();

var corsOptions = {
    origin: ['https://trello.com','https://coderjana3.github.io', 'https://coderjana3.netlify.app']
  };
  
  app.use(cors(corsOptions));

  //app.use(express.static('/'));

  app.post('/src/js/auth', function (request, response){
    response.send({
        token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f",
    });
  });