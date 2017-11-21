var Client = require('mariasql'),
    connection = new Client({
        user: 'molca',
        password: 'chipotle01',
        host: 'localhost',
        db: 'molcajete'
    }),
    user = {};

user.findById = function(username, callback){ 
    connection.query('SELECT id, username, password FROM user WHERE username = :username', { username: username },
        function (err, rows) {
            if(err)
                throw err;
            if(!rows.length)
                callback(null);
            else{
                callback({ 
                    id: rows[0].id,
                    username: username,
                    password: rows[0].password
                });
            }
        }
    );
}

module.exports = user;
