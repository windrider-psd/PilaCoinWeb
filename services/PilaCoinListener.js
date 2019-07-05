let {CrossAppCommunicator, MESSAGETYPE, OPERATIONTYPE, RESPONSESTATUS} = require('./CrossAppComunicator')
let {PilaCoin, User, Transaction, Connection} = require('./../model/DBModels')
let Bluebird = require('bluebird')



let {Op} = require('sequelize')
let lodash = require('lodash')

class PilaCoinListener{
    constructor()
    {

        CrossAppCommunicator.OnReady(() => {
            
            /*CrossAppCommunicator.WriteCommand('user', OPERATIONTYPE.READ, {}, (err, res) => {
                if(err)
                {
                    console.error(err)
                }
                else if(res.responseStatus != RESPONSESTATUS.OK)
                {
                    console.error(res.arg)
                }
                else
                {

                    
                }
            })*/

            let GetPilasCoins = () => {
                return new Promise((resolve, reject) => {
                    CrossAppCommunicator.WriteCommand('pilacoin/storage', OPERATIONTYPE.READ, {}, (err, res) => {
                        if(err)
                        {
                            reject(err)
                        }
                        else if(res.responseStatus != RESPONSESTATUS.OK)
                        {
                            reject(res.arg)
                        }
                        else
                        {
                            resolve(res.arg)
                        }
                    })
                })
                
            }

            Connection.transaction()
                .then(t => {
                    PilaCoin.destroy({where : {}, transaction : t})
                        .then(() => {
                            GetPilasCoins()
                                .then(pilaCoins => {
                                    let promisses = []

                                    lodash.each(pilaCoins, (pilaCoin) => {
                                        let p = new Bluebird((resolve, reject) => {
                                            let trans = pilaCoin.transacoes
                                            delete pilaCoin.transacoes
                                           
                                            
                                            PilaCoin.create(pilaCoin, {transaction : t})
                                                .then((createdPilaCoin) => {
                                                    let subPromisses = []
                                                    if(typeof(trans) == "undefined" && trans == null)
                                                    {
                                                        resolve();
                                                        return;
                                                    }
                                                    lodash.each(trans, (tran) => {
                                                        //console.log(tran)    
                                                        tran['pilaCoin'] = createdPilaCoin.dataValues.id
                                                        let sub = new Bluebird((re, rj) => {
                                                            Transaction.create(tran, {transaction : t})
                                                                .then((x) => {
                                                                    re();
                                                                })
                                                        })
                                                        subPromisses.push(sub)
                                                    })

                                                Bluebird.all(subPromisses)
                                                    .then(() => {
        
                                                        resolve();
                                                    })
                                                })
                                            
                                        }) 
                                        
                                        promisses.push(p);
                                    })
                                    Bluebird.all(promisses)
                                        
                                        .then(() => {
                                            t.commit()
                                                .then(() => {
                                                    console.log("Synced")
                                                })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                    
                                })
                        })
                    
                })
                .catch(err => {
                    console.log(err)
                })

            
        })
        

        CrossAppCommunicator.OnCommand('pilacoin/finished-validation', OPERATIONTYPE.WRITE, (command, wr) => {
            console.log("HELP!")
            let pilacoin = command.arg;
            let createOBJ = {}
            for(let key in pilacoin)
            {
                createOBJ[key] = pilacoin[key]
            }
            delete createOBJ.transacoes
            createOBJ.dataCriacao = new Date(createOBJ.dataCriacao)

            PilaCoin.create(createOBJ)
                .then((p) => {
                    wr(RESPONSESTATUS.OK, {})
                })
                .catch((err) => {
                    console.log(err)
                    wr(RESPONSESTATUS.ERROR, err.message)
                })
                

        })
    }
}

module.exports = new PilaCoinListener()