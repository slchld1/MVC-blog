const { Blog } = require('../models');

const blogData = [
    {
        blog_title: "This is the best post",
        blog_description: "Trace, Analyze, Infer, Evaluate, Formulate, Describe, Support, Explain, Summarize, Compare, Contrast, Predict.",
        user_id: 1
    },
    {
        blog_title: "New orchid species found in Japan",
        blog_description: "An amateur naturalist came across a new species of orchid in Tokyo.",
        user_id: 4
    },
    {
        blog_title: "Half of world population will be overweight by 2035",
        blog_description: "A report says half of us will be classed as obese or overweight by 2035.",
        user_id: 3
    },
    {
        blog_title: "Scientists discover Earth has two cores",
        blog_description: "Scientists have discovered that Earth may have a second core.",
        user_id: 2
    },
    {
        blog_title: "White House says no aliens in weather balloons",
        blog_description: "Strange goings-on are happening in the skies above North America.",
        user_id: 1
    }
]

const seedingBlog = () => {
    Blog.bulkCreate(blogData, {
        individualHooks: true,
        returning: true,
    });
}

module.exports = seedingBlog;