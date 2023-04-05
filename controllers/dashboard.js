const router = require('express').Router();
const sequelize = require('../config/connections');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET method for all blogs of the user
router.get('/', withAuth, (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'blog_title',
            'blog_description',
            'blog_body',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'post_id', 'comment_text', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const blogPost = data.map(post => post.get({ plain: true }))
        res.render('dashboard', { blogPost, loggedIn: true})
    }).catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;