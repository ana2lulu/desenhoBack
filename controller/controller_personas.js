const personasDAO = require('../model/DAO/personas.js')
const message = require('../modulo/config.js')

//listar todos as personas
const getListarPersonas = async function(){

    let personasJSON = {}

    let dadosPersonas = await personasDAO.selectAllpersonas()

    if(dadosPersonas) {
        
        personasJSON.personas = dadosPersonas
        personasJSON.quantidade = dadosPersonas.length
        personasDAO.status_code = 200

        return personasJSON
    }else{
        return false
    }

}

const setInserirNovoPersona = async function(dadosPersonas, contentType) {

    try {

        if (String(contentType).toLowerCase() === 'application/json') {

            let novoPersonaJSON = {};

            if (dadosPersonas.id_dublador === '' || dadosPersonas.id_dublador === undefined ||dadosPersonas.id_dublador === null|| dadosPersonas.id_dublador > 2 ||
                dadosPersonas.nome  === '' || dadosPersonas.nome == undefined || dadosPersonas.nome == null || dadosPersonas.nome
        )
            
            {
                return message.ERROR_REQUIERED_FIELDS; // 400
            } else {
                let validaStatus = false;

                if (dadosPersonas.data_nascimento.length !== 10) {
                    return message.ERROR_REQUIERED_FIELDS; // 400
                } else {
                    validaStatus = true;
                }
        
            if (validaStatus) {
                let novoAtor = await atorDAO.insertAtor(dadosAtor);
    
                if (novoAtor) {
                    novoPersonaJSON.ator = dadosAtor;
                    novoPersonaJSON.status = message.SUCESS_CREATED_ITEM.status;
                    novoPersonaJSON.status_code = message.SUCESS_CREATED_ITEM.status_code;
                    novoPersonaJSON.message = message.SUCESS_CREATED_ITEM.message;
    
                    return novoPersonaJSON; // 201
                } else {
                    return message.ERRO_INTERNAL_SERVER_DB; // 500
                }

            } else {
                return message.ERRO_CONTENT_TYPE; // 415
            }
        }

        }

    } catch (error) {
        console.error('Erro ao inserir novo ator:', error);
        
        return message.ERRO_INTERNAL_SERVER_DB; // 500 (
    }
}

module.exports = {
    getListarPersonas
}