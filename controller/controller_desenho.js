const desenhoDAO = require('../model/DAO/desenho.js')
const message = require('../modulo/config.js')


//listar todos os desenhos
const  getListarDesenhos = async function(){

    let desenhoJSON = {}

    let dadosDesenho  = await desenhoDAO.selectALLDesenho()

    if(dadosDesenho) {

        desenhoJSON.desenho = dadosDesenho
        desenhoJSON.quantidade = dadosDesenho.length
        desenhoJSON.status_code = 200

        return desenhoJSON
    }else{
        return false
    }

}

// buscar pelo id 
const getListarDesenho = async function(id) {
    let idDesennho = id

    let desenhoJSON = {}

    if(idDesennho == '' || idDesennho == undefined || isNaN(idDesennho)) {
        return message.ERROR_INVALID_ID
    }else {
        let dadosdesenho = await desenhoDAO.selectALLDesenhobyId(idDesennho)

        if(dadosdesenho) {
            if(dadosAtor.length > 0){
                desenhoJSON.desenho = dadosdesenho
                desenhoJSON.status_code = 200

                return desenhoJSON
            }else
            return message.ERROR_NOT_FOUND
        }else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}


module.exports = {
    getListarDesenhos,
    getListarDesenho
}