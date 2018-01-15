const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/group', passport.authenticate('jwt', {session: false}), require('./group'));
router.use('/address', passport.authenticate('jwt', {session: false}), require('./address'));

module.exports = router ;
