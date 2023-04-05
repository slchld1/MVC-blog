const { User } = require('../models')

const userData = [
    {
        name: "Minjae_Cho",
        username: "alswo203",
        email: "jaecho203@gmail.com",
        password: "password123"
    },
    {
        name: "Testing123",
        username: "test1212",
        email: "example@gmail.com",
        password: "test1234"
    },
    {
        name: "John",
        username: "johnIsHere",
        email: "john123@gmail.com",
        password: "johnisnothere"
    },
    {
        name: "Dianne_Park",
        username: "diannePark",
        email: "diannep@gmail.com",
        password: "passwordddd"
    }
]

const seedingUsers = async() => {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
}

module.exports = seedingUsers;