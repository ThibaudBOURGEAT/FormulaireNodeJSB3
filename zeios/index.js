var express = require('express');
var User = require('./models/User');
var path = require('path');
require("./config.js");

const app = express();

app.use(express.static(path.join(__dirname, 'app/dist')));

app.listen(process.env.PORT, function() {
  console.log('Le serveur répond sur le port: '+ process.env.PORT);
});


app.get('/register', function(req,res){
  User.find({}).limit(10).then(function(users){
    res.json(users);
  });
});


app.post('/register', function(req,res){
var password = req.body.password;

  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    login: req.body.login,
    password: hash.hashPassword(password),
  });

  newUser.save(function(err){
    res.json({success: true, message: 'Account created !'});
  });
});
