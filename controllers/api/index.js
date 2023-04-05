const router = require('express').Router();
const user = require('./user.js');
const post = require('./posts.js');


router.use('/users', user);
router.use('/posts', post);

module.exports = router;