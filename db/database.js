const Sequelize = require('sequelize');
//live vala
// const sequelize = new Sequelize('oneplace', 'root', 'Niit@Cnf@99#', {
//     dialect: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     multipleStatements: true
// });
//local vala
const sequelize = new Sequelize('blog', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
    port:3306
});

module.exports = sequelize;