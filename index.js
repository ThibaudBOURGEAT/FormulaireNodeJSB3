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

app.post('/register', urlParser, (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(req.body));
});

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ port);
});
