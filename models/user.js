var Client = require('mariasql'),
    connection = new Client({
        user: process.env.MOLCAJETE_DB_USER,
        password: process.env.MOLCAJETE_DB_PASSWORD,
        host: process.env.MOLCAJETE_DB_SERVER,
        db: process.env.MOLCAJETE_DB_NAME
    }),
    user = {};

user.findById = function(username, callback){ 
    connection.query('SELECT id, username, password FROM user WHERE username = :username', 
        { username: username },
        function (err, rows) {
            if(err)
                throw err;
            if(!rows.length)
                callback(null);
            else{
                callback({ 
                    id: rows[0].id,
                    username: rows[0].username,
                    password: rows[0].password
                });
            }
        }
    );
};

user.create = function(username, password, fullName, callback) {
    connection.query('INSERT INTO user(username, password, active, creation_date, last_access, full_name)' +
    ' VALUES (:username,:password, 1, NOW(), null, :fullName)',
        { username: username, password: password, fullName: fullName }, 
        function(err, result) {
            if(err)
                throw err;            
            else {
                callback({ 
                    id: result.info.insertId,
                    username: username,
                    fullName: fullName
                })
            }
        }
    );
}

module.exports = user;
