const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const blogs = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
})




module.exports = blogs;