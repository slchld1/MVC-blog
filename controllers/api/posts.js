const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// find all posts
router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
            'id',
            'blog_title',
            'blog_description',
        ],
        order: [['id', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'email']
                },
            },
            {
                model: User,
                attributes: [ 'username', 'email' ]
            },
        ]
    }).then(data => {
        res.json(data)
    })
        .catch((err) =>{
            if(err){
                console.log(err);
                res.status(500).json(err);
            }
        });
});

// create new post
router.post('/', (req, res) => {
    Blog.create({
        blog_title: req.body.blog_title,
        blog_description: req.body.blog_description,
        user_id: req.session.user_id
    }).then((data) => {
        res.json(data)
    })
        .catch((err) => {
            if(err) {
                console.log(err)
                res.status(500).json(err);
            }
        })
})

// delete a post

router.delete('/:id', (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id,
        },
    }).then((data) => {
        if(!data) {
            res.status(404).json({ message: 'No Post found.'})
            return;
        }
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT method update post by id
router.put('/:id', (req, res) => {
    Blog.update({
        blog_title: req.body.blog_title,
        blog_description: req.body.blog_description,
    },
    {
        where: {
            id: req.params.id,
        },
    }).then((data) => {
        if(!data) {
            res.status(404).json({ message: 'No Post Found.'});
            return;
        }
        res.json(data);
    }).catch((err) => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
})

module.exports = router;