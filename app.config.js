module.exports = {
    mode : 'development',
    database:
    {
        user: 'root',
        password : '',
        databaseName: 'pilacoin',
        dialect : "mysql",
        host : 'localhost'
    },
    defaultAdmin:{
        username : 'admin',
        password : '1234'
    },
    web: {
        host: "localhost",
        port : "80"
    }
}