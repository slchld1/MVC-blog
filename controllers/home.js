const router = require('express').Router();
const { User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Blog.findAll({
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
        res.render('blogs', { blogs, loggedIn: req.session.loggedIn})
    }).catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

router.get("/register", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("register", { title: 'register' });
});

module.exports = router;