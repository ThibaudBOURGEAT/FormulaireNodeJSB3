var express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'app/dist')));

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ process.env.PORT);
});
