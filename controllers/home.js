const router = require('express').Router();
const { User, Blog } = require('../models')
const auth = require('..//middleware/auth')

router.get('/', async (req, res) => {
    try{
        const dbBlog = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'username']
                    },
                },
            ],
        })
        const renderedData = dbBlog.map((el) => el.get({pain: true}));
        res.render('blogs', {
            title: 'Tech Blog',
            data: renderedData,
            logged_in: req.session.logged_in,
            logged_out: !req.session.logged_in,
        });
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
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

    res.render("register");
});

module.exports = router;