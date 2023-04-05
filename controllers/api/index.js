const router = require('express').Router();
const user = require('./user.js');


router.use('/users', user);

module.exports = router;