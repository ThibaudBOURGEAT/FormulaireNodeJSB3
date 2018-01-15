const router = require('express').Router();

router.get('/all', function(req,res){
    Group.find({}).limit(10).then(function(groups){
        res.json(groups);
    });
});

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

router.delete('/delete', function(req,res){
    Group.remove({wording: req.body.wording}, function(err){
        if (err){
            res.json("Error");
        }else{
            res.json({success: true, message: 'Account delete !'})
        }
    });
});

router.delete('/softdelete', function(req, res) {
    Group.find({
            wording: req.body.wording
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
