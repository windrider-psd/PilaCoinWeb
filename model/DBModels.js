let {Sequelize} = require ('sequelize')
require('dotenv/config')

let ready = false;

const Op = Sequelize.Op;
const operatorsAlias = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
  };


const con = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, 
    dialect : 'mysql',
    operatorsAliases : false,
    timezone : 'Brazil/East',
    sync : {force : true},
    operatorsAliases: operatorsAlias,
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
    console.log("Conexao Criada");
    ready = true;
}).catch((err) =>
{
    console.log(err.parent);
});



