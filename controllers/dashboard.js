const router = require('express').Router();
const sequelize = require('../config/connections');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth.js');

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
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'blog_id', 'comment_text', 'user_id'],
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
        const blogs = data.map(blog => blog.get({ plain: true }))
        res.render('dashboard', { blogs, loggedIn: true})
    }).catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});
router.get('/view/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'blog_title',
            'blog_description',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'blog_id', 'comment_text', 'user_id'],
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
        if(!data){
            res.status(404).json({ message: 'No post found.'})
            return;
        }

        const blog = data.get({ plain: true });
        res.render('blogview', { blog, loggedIn: true });
    }).catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
})


router.get('/edit/:id', withAuth,(req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'blog_title',
            'blog_description',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'blog_id', 'comment_text', 'user_id'],
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
        if(!data){
            res.status(404).json({ message: 'No post found.'})
            return;
        }

        const blog = data.get({ plain: true });
        res.render('blogedit', { blog, loggedIn: true });
    }).catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});
module.exports = router;