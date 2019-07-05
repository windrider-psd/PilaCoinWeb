module.exports = {
    mode : 'development',
    database:
    {
        user: 'postgres',
        password : '1234',
        databaseName: 'pilacoin',
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