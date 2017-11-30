const config = {
    app: {
        port: 8080
    },
    db: {
        user: process.env.MOLCAJETE_DB_USER,
        password: process.env.MOLCAJETE_DB_PASSWORD,
        host: process.env.MOLCAJETE_DB_SERVER,
        dbname: process.env.MOLCAJETE_DB_NAME
    }
};

module.exports = config;