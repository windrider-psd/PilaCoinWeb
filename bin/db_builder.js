const builder = require('./../model/DBModelsBuilder')
const models = require("./../model/DBModels")
const yargs = require('yargs').argv
const bcrypt = require('bcrypt')
var forca = yargs.force ? yargs.force : true
let config = require('./../app.config')

console.log("Building the database");

builder.ClearForeignKeys()
    .then(() => {
        builder.SyncDatabase(forca,  () =>
        {
            let encryptedPassword = bcrypt.hashSync(config.defaultAdmin.username, 9);

            models.user.create({username : config.defaultAdmin.username, password: encryptedPassword, admin : true})
                .then((createdUser) => {
                    console.log("Builder has finished")
                });
        })
    })