const seedingBlog = require('./blogs');
const seedingComments = require('./comments');
const seedingUsers = require('./users')
const sequelize = require('../config/connections');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedingUsers();
    await seedingBlog();
    await seedingComments();

    console.log('seeding complete');

    process.exit(0);
}

seedAll();