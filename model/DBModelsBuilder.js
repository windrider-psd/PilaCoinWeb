
const models = require("./DBModels.js")
require('dotenv/config');
class DBBuilder {
    constructor() { }
    
    static SyncDatabase(force, callback)
    {
        models.user.sync({force : force})
            .then(() => {
                callback()
            })
            .catch((err) =>
            {
                console.log(err);
                setTimeout(DBBuilder.SyncDatabase, 3000);
            });
        
    }

    /**
    *  @description Apaga todas as constrains da base de dados
    */
   static ClearForeignKeys()
    {
        const queryInterface = models.Con.getQueryInterface();
            return queryInterface.showAllTables().then(tableNames => {
           Promise.all(tableNames.map(tableName => {
                queryInterface.showConstraint(tableName).then(constraints => {
                    Promise.all(constraints.map(constraint => {
                        if (constraint.constraintType === 'FOREIGN KEY') {
                            queryInterface.removeConstraint(tableName, constraint.constraintName);
                        }
                    }))
                })
            }))
        })
    }
}

module.exports = DBBuilder;
