var config = require('../config'),
    Sequelize = require('sequelize'),
    sequelize = new Sequelize(config.db.dbname, config.db.user, config.db.password, {
        host: config.db.host,
        dialect: 'postgres',
        operatorsAliases: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }),
    User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN
        },
        creationDate: {
            type: Sequelize.DATE,
            field: 'creation_date'
        },
        lastAccess: {
            type: Sequelize.DATE,
            field: 'last_access'
        },
        fullName: {
            type: Sequelize.STRING,
            field: 'full_name'            
        }
    }),
    user = {};

sequelize.authenticate()
    .then(function() {
        console.log('Connection has been established successfully.')
    })
    .catch(function() {
        console.error('Unable to connect to the database:', err);
    });

user.findById = function(username, callback){ 
    User.findOne({
        where: {
            username: username
        }
    })
    .then(function(result) {
        if(!result)
            callback(null);
        else{
            callback(result);
        }
    })
    .catch(function(err){
        console.error(err.mesage);
        callback(null);
    });
};

user.create = function(username, password, fullName, callback) {
    User.create({
        username: username,
        password: password,
        fullName: fullName,
        creationDate: new Date(),
        active: 1
    })
    .then(function(result) {
        callback(result);
    })
    .catch(function(err){
        console.error(err.message);
        callback(null);    
    });
}

module.exports = user;
