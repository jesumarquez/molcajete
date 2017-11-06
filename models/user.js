var user = {};


user.findById = function(username, callback){ 
    var users = [
        {
            username: "jesumarquez@gmail.com",
            password: "123123",
            fullname: "Jesú Márquez"
        },
        {
            username: "pepe@gmail.com",
            password: "123123",
            fullname: "Pepe"
        }
    ];

    var user = users.find(function(u){
        return u.username === username;
    });
    
    callback(user);
}

module.exports = user;
