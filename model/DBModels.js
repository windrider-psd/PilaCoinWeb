let seq = require('sequelize')
let {Sequelize, QueryInterface} = seq
let config = require('../app.config')
let ready = false;

const con = new Sequelize(config.database.databaseName, config.database.user, config.database.password, {
    host: config.database.host, 
    dialect : config.database.dialect,
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
    },
    createdBy: {
        type : Sequelize.INTEGER,
        references:{
            model: "users",
            key : 'id'
        },
        allowNull : true,
        onDelete : 'SET NUll'
    }
});



//user.belongsTo(user, {foreignKey : {allowNull : true, field : "createdBy"}, onDelete : "SET NULL"})

//user.belongsTo(user, {foreignKey : {allowNull : true, field : "createdBy"}, onDelete : "SET NULL"})

const pilaCoin = con.define('pilacoin', {
    id : {
        type : seq.INTEGER,
        primaryKey : true
    },
    idCriador: {
        type : seq.STRING,
        allowNull : false,
    },
    dataCriacao: {
        type: seq.DATE,
        allowNull : false,
    },
    chaveCriador : {
        type : seq.TEXT,
        allowNull : false,
    },
    numeroMagico : {
        type : seq.BIGINT,
        allowNull : false
    },
    assinaturaMaster : {
        type : seq.TEXT,
    }
})

const transaction = con.define('transaction', {
    pilaCoin : {
        type : seq.BIGINT,
    },
    targetId : {
        type : seq.STRING,
        allowNull : false
    },
    user: {
        type : Sequelize.INTEGER,
        references:{
            model : user,
            key : 'id'
        },
        allowNull : true
    }
})

const LoginLog = con.define('login_log', {
    action: 
    {
        type : seq.BOOLEAN,
        allowNull : false,
        default : false
    },
    ip : 
    {
        type : seq.STRING,
        allowNull : false
    },
    user: {
        type : seq.INTEGER,
        allowNull : false,
        references :{
            model : user,
            key : 'id'
        }
    }
})

module.exports = {
    Connection : con,
    User : user,
    PilaCoin : pilaCoin,
    Transaction : transaction, 
    LoginLog : LoginLog,
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



