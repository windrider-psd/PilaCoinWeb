let {Sequelize} = require ('sequelize')
let config = require('../app.config')
let ready = false;

const con = new Sequelize(config.database.databaseName, config.database.user, config.database.password, {
    host: config.database.host, 
    dialect : 'mysql',
    timezone : 'Brazil/East',
    sync : {force : true},
    define:
    {
        collate : 'utf8_general_ci',
        charset : 'utf8'
    },
    logging : ((query, info) => {
        if(info.type != "SELECT")
        {
            console.log(query)
        }
    })

});


const user = con.define('user', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    username : 
    {
        type:Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate:
        {
            min: 4
        }
    },
    password: 
    {
        type:Sequelize.STRING,
        allowNull : false,
    },
    admin: {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        default : false
    }
});

module.exports = {
    Con : con,
    user : user, 
    isReady : function(){return ready;}
};

con.authenticate().then(() =>
{
    console.log("Database connection has been created");
    ready = true;
}).catch((err) =>
{
    console.log(err.parent);
});



