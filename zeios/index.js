var express = require('express');

const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'app/dist')));

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ port);
});
