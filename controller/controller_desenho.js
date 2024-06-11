const desenhoDAO = require('../model/DAO/desenho.js')
const message = require('../modulo/config.js')


//listar todos os desenhos
const  getListarDesenhos = async function(){

    let desenhoJSON = {}

    let dadosDesenho  = await desenhoDAO.selectALLDesenho()

    if(dadosDesenho) {

        desenhoJSON.desenho = dadosDesenho
        desenhoJSON.qauntidade = dadosDesenho.length
        desenhoJSON.status_code = 200

        return desenhoJSON
    }else{
        return false
    }

}



module.exports = {
    getListarDesenhos
}