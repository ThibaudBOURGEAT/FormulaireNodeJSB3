var express = require('express');
var User = require('./models/User');
var bodyParser = require('body-parser');
var hash = require('./helpers/hash');
var path = require('path');
require("./config.js");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/dist')));

app.listen(process.env.PORT, function() {
  console.log('Le serveur répond sur le port: '+ process.env.PORT);
});


app.get('/user/all', function(req,res){
    User.find({}).limit(10).then(function(users){
        res.json(users);
    });
});

app.get('/user', function(req,res){
    res.json(req.user);
});

app.post('/user/register', function(req,res){
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        login: req.body.login,
        password: hash.hashPassword(req.body.password)
    });

    newUser.save(function(err){
        res.json({success: true, message: 'Account created !'});
    });
});

app.delete('/user/delete', function(req,res){
    User.remove({login: req.body.login}, function(err){
        if (err){
            res.json("Error");
        }else{
            res.json({success: true, message: 'Account delete !'})
        }
    });
});
