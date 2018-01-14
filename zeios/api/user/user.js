const router = require('express').Router();
var hash = require('../../helpers/hash');
var User = require('../../models/User');
var Group = require('../../models/Group');
var Address = require('../../models/Address');


router.get('/all', function(req,res){
    User.find({}).limit(10).then(function(users){
        res.json(users);
    });
});

router.get('/', function(req,res){
    res.json(req.user);
});

router.post('/register', function(req,res){

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
                newGroup.save();
                newUser.group = newGroup._id;
                return;
            }
            newUser.group = group._id;
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

router.post('/update', function(req,res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = hash.hashPassword(req.body.password);

    if(!firstname){ firstname = req.user.firstname;}
    if(!lastname){ lastname = req.user.lastname;}
    if(!password){ password = hash.hashPassword(req.user.password)}

    User.find({login: req.user.login}).update({
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

router.delete('/delete', function(req,res){
    User.remove({login: req.body.login}, function(err){
        if (err){
            res.json("Error");
        }else{
            res.json({success: true, message: 'Account delete !'})
        }
    });
});

router.delete('/softdelete', function(req, res) {
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

module.exports = router;
