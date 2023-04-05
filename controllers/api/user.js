const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// GET USERS
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Blog,
                attributes: ['id', 'blog_title', 'blog_description']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body'],
                include: {
                    model: Blog,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(data => {
        if(!data) {
            res.status(404).json({
            message: 'User Not Found'
        });
        return;
    }
    res.json(data);
}).catch(err => {
    if(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
});

// POST register users (save session)
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    .then(data => {
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.name = data.name;
            req.session.username = data.username;
            req.session.email = data.email;
            req.session.loggedIn = true;
            res.json(data);
        });
    });
});

// POST METHOD users Login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(data => {
        if(!data) {
            res.status(400).json({
                message: 'User Does Not Exist.'
            });
            return;
        }

        const validate = data.checkPassword(req.body.password);

        if(!validate) {
            res.status(400).json({message: 'Incorrect Password'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.name = data.name;
            req.session.username = data.username;
            req.session.email = data.email;
            req.session.loggedIn = true;

            res.json({ user: data, message: 'logged in'});
        });
    });
});

// post Logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;