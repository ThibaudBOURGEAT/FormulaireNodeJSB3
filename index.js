var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var urlParser = bodyParser.urlencoded({extended: true});

var csvWriter = require('csv-write-stream')
var writer = csvWriter({headers: ["lastname" ," firstname" ,"address" , "pseudo" , "email"]});

const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'app/dist')));

app.get('/', (req, res) => {
  res.contentFile = fs.readFileSync(__dirname + '/app/src/event.txt', "UTF-8");

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fs.readFileSync(__dirname + '/app/src/templates/index.html'));
});

app.get('/register', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fs.readFileSync(__dirname + '/app/src/templates/register.html'));
});

app.post('/register', urlParser,(req, res) => {
    writer.pipe(fs.appendFileSync(__dirname + '/app/src/formList.csv'));
    writer.write(req.body);
    writer.end();

    // fs.writeFile(__dirname + '/app/src/formList.csv', JSON.stringify(req.body), 'utf8', function (err) {
    //     if (err) {
    //         console.log('Some error occured - file either not saved or corrupted file saved.');
    //     } else{
    //         console.log('It\'s saved!');
    //     }
    // });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(__dirname + '/app/src/templates/register.html'));
});

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ port);
});
