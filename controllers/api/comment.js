const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// GET all comments
router.get('/', (req, res) => {
    //no attributes needed
    Comment.findAll({}).then(data => {
        res.json(data)
    }).catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// POST create comment

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id,
        }).then(data => {
            res.json(data)
        }).catch(err => {
            if(err) {
                console.log(err);
                res.status(400).json(err);
            }
        });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      }).then(data => {
          if (!data) {
            res.status(404).json({ message: 'No comment exists with this id' });
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

module.exports = router;