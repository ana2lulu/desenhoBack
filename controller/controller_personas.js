const personasDAO = require('../model/DAO/personas.js')
const message = require('../modulo/config.js')

//listar todos as personas
const getListarPersonas = async function(){

    let personasJSON = {}

    let dadosPersonas = await personasDAO.getListarPersonas()

    if(dadosPersonas) {
        
        personasJSON.personas = dadosPersonas
        personasJSON.quantidade = dadosPersonas.length
        personasDAO.status_code = 200

        return personasJSON
    }else{
        return false
    }

}

    const setInserirNovoPersonas = async function(dadosPersonas, contentType) {
    try {
        console.log(dadosPersonas);

        if (String(contentType).toLowerCase() === 'application/json') {

            let novoPersonaJSON = {};
            
            if (dadosPersonas.id_dublador === '' || dadosPersonas.id_dublador === undefined ||dadosPersonas.id_dublador === null|| isNaN(dadosPersonas.id_dublador) ||
                dadosPersonas.nome  === '' || dadosPersonas.nome == undefined || dadosPersonas.nome == null
        )
            
            {
                return message.ERROR_REQUIERED_FIELDS; // 400
            } else {
              
                let novoPersonas = await personasDAO.insertPersonas(dadosPersonas);
    
                if (novoPersonas) {
                    novoPersonaJSON.personas = dadosPersonas;
                    novoPersonaJSON.status = message.SUCESS_CREATED_ITEM.status;
                    novoPersonaJSON.status_code = message.SUCESS_CREATED_ITEM.status_code;
                    novoPersonaJSON.message = message.SUCESS_CREATED_ITEM.message;
    

                    console.log(novoPersonaJSON)
                    return novoPersonaJSON; // 201
                } else {

                    return message.ERRO_INTERNAL_SERVER_DB; // 500
                }

        }

        }
        else {


            return message.ERRO_CONTENT_TYPE; // 415
        }

    } catch (error) {
        console.error('Erro ao inserir novo personas:', error);
        return message.ERRO_INTERNAL_SERVER_DB; // 500 (
    }
}



// buscar pelo id 
const getBuscarIdPersonas= async function(id) {
    let idPersonas = id

    // Esse é o código da controller.persona:
    let personasJSON = {}

    if(idPersonas == '' || idPersonas == undefined || isNaN(idPersonas)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosPersonas = await personasDAO.getBuscarIdPersonas(idPersonas)

        if(dadosPersonas && dadosPersonas.length > 0) {
            personasJSON.personas = dadosPersonas
            personasJSON.status_code = 200
            return personasJSON
        } else if(dadosPersonas.length === 0) {
            return message.ERROR_NOT_FOUND
        } else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}

//delete persona

const deletePersonas = async function(id) {
    let idDelete = id

    // Esse é o código da controller.persona:
    let personasJSON = {}

    if(idDelete == '' || idDelete == undefined || isNaN(idDelete)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosDesenho = await personasDAO.deleteDesenhoPersonas(idDelete)
        let dadosPersonas = await personasDAO.deletePersonas(idDelete)

        if(dadosPersonas) {
            personasJSON.personas = dadosPersonas
            personasJSON.status_code = 200
            return personasJSON
        } else if(dadosPersonas.length === 0) {
            return message.ERROR_NOT_FOUND
        } else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}




module.exports = {
    getListarPersonas,
    getBuscarIdPersonas,
    setInserirNovoPersonas,
    deletePersonas
    
}