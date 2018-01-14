var express = require('express');
var bodyParser = require('body-parser');
var hash = require('./helpers/hash');
var path = require('path');
require("./config.js");

var User = require('./models/User');
var Group = require('./models/Group');
var Address = require('./models/Address');

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

    newUser.validate().then(function(){
        Group.findOne({wording: req.body.group}).then(function(group){
            if(!group && req.body.group){
                const newGroup = new Group({
                    wording: req.body.group,
                    description: ""
                });
                console.log("test1");
                newGroup.save();
                newUser.group = newGroup._id;
                console.log("test2");
                return;
            }
            console.log("test4");
            newUser.group = group._id;
            console.log("test5");
        });
    }).then(function(){
        newUser.save()
            .then(() => {
                res.json({success: true, message: 'Account created !'});
            })
            .catch((err) => {
                res.json("Error");
                console.log(err);
            });
    });
});

app.post('/user/update', function(req,res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = hash.hashPassword(req.body.password);

    if(!firstname){ firstname = req.user.firstname;}
    if(!lastname){ lastname = req.user.lastname;}
    if(!password){ password = hash.hashPassword(req.user.password)}

    User.find({login: req.body.login}).update({
        $set: {
            firstname: firstname,
            lastname: lastname,
            password: password
        }
    }, function(err){
        if(err){res.json({success: false, message: 'Error'});}
        else{res.json({success: true, message: 'Account update !'});}
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

app.post('/group/register', function(req,res){
    const newGroup = new Group({
        wording: req.body.wording,
        description: req.body.description
    });

    newGroup.save(function(err){
        res.json({success: true, message: 'Group created !'});
    });
});

app.delete('/user/softdelete', function(req, res) {
    User.find({
            login: req.body.login
        })
        .update({
            deleted: true
        }, function(err) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Account softdelete !'
                });
            }
        })
});
