const sequelize = require('sequelize').Sequelize

const sqlProperties = new sequelize('SessionsEx','sa','DaddyJugoxN3',{
    dialect: 'mssql', 
    host: 'localhost', 
    port: 1433, 
    dialectOptions:{
        options: {encrypt: false}
    },
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});

module.exports = sqlProperties;