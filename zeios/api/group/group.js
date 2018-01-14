const router = require('express').Router();

router.post('/register', function(req,res){
    const newGroup = new Group({
        wording: req.body.wording,
        description: req.body.description
    });

    newGroup.save(function(err){
        res.json({success: true, message: 'Group created !'});
    });
});

router.post('/update', function(req,res){
    var description = req.body.description;

    Group.find({login: req.body.wording}).update({
        $set: {
            description: description
        }
    }, function(err){
        if(err){res.json({success: false, message: 'Error'});}
        else{res.json({success: true, message: 'Group update !'});}
    });
});

module.exports = router;
