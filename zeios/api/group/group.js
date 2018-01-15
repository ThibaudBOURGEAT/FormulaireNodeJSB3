const router = require('express').Router();
const User = require('../../models/User');
const Group = require('../../models/Group');

router.get('/all', function(req, res) {
    Group.find({
        deleted: false
    }).limit(10).then(function(groups) {
        res.json(groups);
    });
});

router.post('/register', function(req, res) {
    const newGroup = new Group({
        wording: req.body.wording,
        description: req.body.description
    });

    newGroup.save(function(err) {
        res.json({
            success: true,
            message: 'Group created !'
        });
    });
});

router.post('/update', function(req, res) {
    var description = req.body.description;

    Group.find({
        login: req.body.wording
    }).update({
        $set: {
            description: description
        }
    }, function(err) {
        if (err) {
            res.json({
                success: false,
                message: 'Error'
            });
        } else {
            res.json({
                success: true,
                message: 'Group update !'
            });
        }
    });
});

router.post('/addUser', (req, res) => {
    Group.find({})
        .then((groups) => {
            for (group in groups) {
                User.find({
                        group: groups[group]._id
                    })
                    .then((users_group) => {
                        for (user in users_group) {
                            console.log(user);
                            groups[group].users.push(user);
                        }
                        groups[group].save()
                            .catch((err) => {
                                res.json(err);
                            })
                    })

            }

            res.json({success: true, message: 'All users are add to group'});
        })
        .catch((err) => {
            res.json(err);
        })
})

router.delete('/delete', function(req, res) {
    Group.remove({
        wording: req.body.wording
    }, function(err) {
        if (err) {
            res.json("Error");
        } else {
            res.json({
                success: true,
                message: 'Account delete !'
            })
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
