const dubladorDAO = require('../model/DAO/dublador.js')
const message = require('../modulo/config.js')


//listar todas os dubladores
const getListarDublador = async function(){

    let dubladorJSON = {}

    let dadosDublador = await dubladorDAO.selectAllDublador()

    if(dadosDublador) {

        dubladorJSON.dublador = dadosDublador
        dubladorJSON.quantidade = dadosDublador.length
        dubladorJSON.status_code = 200

        return dubladorJSON
    }else{
        return false
    }

}

module.exports = {
    getListarDublador
}