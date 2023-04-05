const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        blog_id: 2,
        comment_text: "No Way!"
    },
    {
        user_id: 2,
        blog_id: 2,
        comment_text: "I wanna see!"
    },
    {
        user_id: 3,
        blog_id: 2,
        comment_text: "Do you have a picture?"
    },
    {
        user_id: 4,
        blog_id: 1,
        comment_text: "It is the best post"
    },
    {
        user_id: 2,
        blog_id: 1,
        comment_text: "I see, I see"
    },
    {
        user_id: 3,
        blog_id: 1,
        comment_text: "Wow"
    },
    {
        user_id: 1,
        blog_id: 3,
        comment_text: "No Way!"
    },
    {
        user_id: 2,
        blog_id: 3,
        comment_text: "Statistics?"
    },
    {
        user_id: 4,
        blog_id: 3,
        comment_text: "Half the world?"
    },
    {
        user_id: 1,
        blog_id: 4,
        comment_text: "Maybe it has 3?"
    },
    {
        user_id: 3,
        blog_id: 4,
        comment_text: "2 cores??"
    },
    {
        user_id: 3,
        blog_id: 4,
        comment_text: "Do you have a picture?"
    },
    {
        user_id: 4,
        blog_id: 5,
        comment_text: "Yes Aliens in weather balloons"
    },
    {
        user_id: 2,
        blog_id: 5,
        comment_text: "I'm the alien"
    },
    {
        user_id: 3,
        blog_id: 5,
        comment_text: "Do you have a picture?"
    }
]

const seedingComments = async() => {
    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });
}

module.exports = seedingComments