var express = require('express');

const port = 8000;
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/src/templates/index.html')
});

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ port);
});
