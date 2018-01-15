const router = require('express').Router();
const hash = require('../../helpers/hash');
const User = require('../../models/User');
const Group = require('../../models/Group');
const Address = require('../../models/Address');
const passport = require('passport');

router.get('/all', function(req,res){
    User.find({deleted: false}).limit(10).then(function(users){
        res.json(users);
    });
});

router.get('/', passport.authenticate('jwt', {session: false}), function(req,res){
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
        Group.findOne({wording: req.body.group, deleted: false}).then(function(groupFind){
            if(!groupFind && req.body.group){
                const newGroup = new Group({
                    wording: req.body.group,
                    description: ""
                });
                newGroup.save();
                newUser.group.push(newGroup);
                newUser.save().then(function(){
                    res.json({success: true, message: 'Account created !'});
                }).catch(function(err){
                    if(err){res.json(err)};
                });
            }
            newUser.group.push(groupFind);
            newUser.save().then(function(){
                res.json({success: true, message: 'Account created !'});
            }).catch(function(err){
                if(err){res.json(err)};
            });
        });
    })
});

router.post('/update', passport.authenticate('jwt', {session: false}), function(req,res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = hash.hashPassword(req.body.password);

    if(!firstname){ firstname = req.user.firstname;}
    if(!lastname){ lastname = req.user.lastname;}
    if(!password){ password = hash.hashPassword(req.user.password)}

    User.find({login: req.user.login, deleted: false}).update({
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

router.delete('/delete', passport.authenticate('jwt', {session: false}), function(req,res){
    User.remove({login: req.body.login}, function(err){
        if (err){
            res.json("Error");
        }else{
            res.json({success: true, message: 'Account delete !'})
        }
    });
});

router.delete('/softdelete', passport.authenticate('jwt', {session: false}), function(req, res) {
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
