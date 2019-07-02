const builder = require('./../model/DBModelsBuilder')
const models = require("./../model/DBModels")
const yargs = require('yargs').argv

var forca = yargs.force ? yargs.force : true

console.log("Construindo a base de dados");

builder.ClearForeignKeys()
    .then(() => {
        builder.SyncDatabase(forca,  () =>
        {
            
        })
    });