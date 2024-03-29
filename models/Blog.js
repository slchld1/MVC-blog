const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'user',
            key: 'id',
        },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
    );
    
    module.exports = Blog;