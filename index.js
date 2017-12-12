var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencoderParser = bodyParser.urlencoded({ extended: false});

const port = 8000;
const app = express();

app.get('/register', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fs.readFileSync(__dirname + '/app/src/templates/index.html'));
});

app.post('/register', urlencoderParser,(req, res) => {
  console.log("ok");
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json; charset=utf-8');
  res.end(JSON.stringify(req.body));
});

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ port);
});
