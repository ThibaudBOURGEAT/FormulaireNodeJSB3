const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
require("./config.js");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/dist')));
app.use('/', require('./api'));

app.listen(process.env.PORT, function() {
  console.log('Le serveur répond sur le port: '+ process.env.PORT);
});
