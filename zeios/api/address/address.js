const router = require('express').Router();

router.get('/all', function(req, res) {
    Address.find({}).limit(10).then(function(address) {
        res.json(address);
    });
});

router.post('/register', function(req, res) {
    const newAddress = new Address({
        streetname: req.body.streetname,
        numstreet: req.body.numstreet,
        city: req.body.city,
        codepostal: req.body.codepostal
    });

    newAddress.save(function(err) {
        res.json({
            success: true,
            message: 'Address created !'
        });
    });
});

router.post('/update', function(req, res) {
    const streetname = req.body.streetname
    const numstreet = req.body.numstreet
    const city = req.body.city
    const codepostal = req.body.codepostal

    Address.find({
        streetname: streetname,
        numstreet: numstreet,
        city: city,
        codepostal: codepostal
    }).update({
        $set: {
            streetname: streetname,
            numstreet: numstreet,
            city: city,
            codepostal: codepostal
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
                message: 'Address update !'
            });
        }
    });
});

router.delete('/delete', function(req, res) {
    Address.remove({
        streetname: req.body.streetname,
        numstreet: req.body.numstreet,
        city: req.body.city,
        codepostal: req.body.codepostal
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
    Address.find({
            streetname: req.body.streetname,
            numstreet: req.body.numstreet,
            city: req.body.city,
            codepostal: req.body.codepostal
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
