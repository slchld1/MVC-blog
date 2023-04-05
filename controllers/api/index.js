const router = require('express').Router();
const user = require('./user.js');
const post = require('./posts.js');
const comment = require('./comment.js');


router.use('/users', user);
router.use('/posts', post);
router.use('/comment', comment);

module.exports = router;