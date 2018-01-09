var express = require('express');
var User = require('../User');

const app = express();

app.use(express.static(path.join(__dirname, 'app/dist')));

app.listen(port, function() {
  console.log('Le serveur répond sur le port: '+ process.env.PORT);
});


app.get('/register', function(req,res){
  User.find({}).limit(10).then(function(users){
    res.json(users);
  });
});


app.post('/register', function(req,res){
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    login: req.body.login,
    password: req.body.password,
  });

  newUser.save(function(err){
    res.json({success: true, message: 'Account created !'});
  });
});
