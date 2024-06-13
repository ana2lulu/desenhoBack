const dubladorDAO = require('../model/DAO/dublador.js')
const message = require('../modulo/config.js')


//listar todas os dubladores
const getlistarDublador = async function(){

    let dubladorJSON = {}

    let dadosDublador = await dubladorDAO.getlistarDublador();

    if(dadosDublador) {

        dubladorJSON.dublador = dadosDublador
        dubladorJSON.quantidade = dadosDublador.length
        dubladorJSON.status_code = 200

        return dubladorJSON
    }else{
        return false
    }

}



// buscar pelo id 
const getBuscarIdDublador= async function(id) {
    let idDublador = id
    let dubladorJSON = {}

    if(idDublador == '' || idDublador == undefined || isNaN(idDublador)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosDublador = await dubladorDAO.getBuscarIdDublador(idDublador)

        if(dadosDublador && dadosDublador.length > 0) {
            dubladorJSON.dublador = dadosDublador
            dubladorJSON.status_code = 200
            return dubladorJSON
        } else if(dadosDublador.length === 0) {
            return message.ERROR_NOT_FOUND
        } else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}

//Inserir dublador

const setInserirNovoDublador = async function(dadosDublador, contentType) {
    try {
        console.log(dadosDublador);

        if (String(contentType).toLowerCase() === 'application/json') {

            let novoDubladorJSON = {};
            
            if (dadosDublador.biografia === '' || dadosDublador.biografia=== undefined ||dadosDublador.biografia=== null|| 
                dadosDublador.nome  === '' || dadosDublador.nome == undefined || dadosDublador.nome == null
        )
            
            {
                return message.ERROR_REQUIERED_FIELDS; // 400
            } else {
              
                let novoDublador = await dubladorDAO.insertDublador(dadosDublador);
    
                if (novoDublador) {
                    novoDubladorJSON.dublador = dadosDublador;
                    novoDubladorJSON.status = message.SUCESS_CREATED_ITEM.status;
                    novoDubladorJSON.status_code = message.SUCESS_CREATED_ITEM.status_code;
                    novoDubladorJSON.message = message.SUCESS_CREATED_ITEM.message;
    

                    console.log(novoDubladorJSON)
                    return novoDubladorJSON; // 201
                } else {

                    return message.ERRO_INTERNAL_SERVER_DB; // 500
                }

        }

        }
        else {


            return message.ERRO_CONTENT_TYPE; // 415
        }

    } catch (error) {
        console.error('Erro ao inserir novo dublador:', error);
        return message.ERRO_INTERNAL_SERVER_DB; // 500 (
    }
}


module.exports = {
    getlistarDublador,
    getBuscarIdDublador,
    setInserirNovoDublador
    
}