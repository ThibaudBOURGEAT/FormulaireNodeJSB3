var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var urlParser = bodyParser.urlencoded({extended: true})

const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname + 'app/dist')));

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fs.readFileSync(__dirname + '/app/src/templates/index.html'));
});

app.get('/register', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fs.readFileSync(__dirname + '/app/src/templates/register.html'));
});

app.post('/register', urlencoderParser,(req, res) => {
  fs.appendFile(__dirname + '/app/src/event.txt', JSON.stringify(req.body) + "\r\n" , "UTF-8");
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  res.end(fs.readFileSync(__dirname + '/app/src/templates/index.html'));

});

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ port);
});
