const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/group', require('./group'));
router.use('/address', require('./address'));

module.exports = router ;
