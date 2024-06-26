const desenhoDAO = require('../model/DAO/desenho.js')
const message = require('../modulo/config.js')


//listar todos os desenhos

const getListarDesenho = async function() {
    let desenhoJSON = {};

    let dadosDesenho = await desenhoDAO.getListarDesenho();

    if (dadosDesenho) {
        desenhoJSON.desenho = dadosDesenho;
        desenhoJSON.quantidade = dadosDesenho.length;
        desenhoJSON.status_code = 200;

        return desenhoJSON;
    } else {
        return { status_code: 404, mensagem: 'Nenhum desenho encontrado' };
    }
}


// Buscar pelo ID
const getBuscarIdDesenho = async function(id) {
    let desenhoJSON = {};

    let dadosDesenho = await desenhoDAO.getBuscarIdDesenho(id);

    if (dadosDesenho) {
        desenhoJSON.desenho = dadosDesenho;
        desenhoJSON.quantidade = dadosDesenho.length;
        desenhoJSON.status_code = 200;

        return desenhoJSON;
    } else {
        return { status_code: 404, mensagem: 'Nenhum desenho encontrado' };
    }
}



//Inserir Desenho


const setInserirNovoDesenho = async function(dadosDesenho, contentType) {
    try {
        console.log(dadosDesenho);

        if (String(contentType).toLowerCase() === 'application/json') {

            let novoDesenhoJSON = {};
            
            if (dadosDesenho.sinopse === '' || dadosDesenho.sinopse === undefined ||dadosDesenho.sinopse === null|| 
                dadosDesenho.nome  === '' || dadosDesenho.nome == undefined || dadosDesenho.nome == null||
                dadosDesenho.foto_capa === '' || dadosDesenho.foto_capa == undefined || dadosDesenho.foto_capa == null||
                dadosDesenho.data_lancamento === '' || dadosDesenho.data_lancamento == undefined || dadosDesenho.data_lancamento == null
             
        )
            
            {
                return message.ERROR_REQUIERED_FIELDS; // 400
            } else {
              
                let novoDesenho = await desenhoDAO.insertDesenho(dadosDesenho);
    
                if (novoDesenho) {
                    novoDesenhoJSON.desenho = dadosDesenho;
                    novoDesenhoJSON.status = message.SUCESS_CREATED_ITEM.status;
                    novoDesenhoJSON.status_code = message.SUCESS_CREATED_ITEM.status_code;
                    novoDesenhoJSON.message = message.SUCESS_CREATED_ITEM.message;
    

                    console.log(novoDesenhoJSON)
                    return novoDesenhoJSON; // 201
                } else {

                    return message.ERRO_INTERNAL_SERVER_DB; // 500
                }

        }

        }
        else {


            return message.ERRO_CONTENT_TYPE; // 415
        }

    } catch (error) {
        console.error('Erro ao inserir novo desenho:', error);
        return message.ERRO_INTERNAL_SERVER_DB; // 500 (
    }
}

//delete desenho

const deleteDesenho = async function(id) {
    let idDesenho = id
    
    let deleteJSON = {}

    if(idDelete == '' || idDelete == undefined || isNaN(idDelete)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosDesenho = await desenhoDAO.deleteDesenho(idDelete)

        if(dadosDesenho && dadosDesenho.length > 0) {
            desenhoJSON.desenho = dadosDesenho
            desenhoJSON.status_code = 200
            return desenhoJSON
        } else if(dadosDesenho.length === 0) {
            return message.ERROR_NOT_FOUND
        } else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}



module.exports = {
    getListarDesenho,
    getBuscarIdDesenho,
    setInserirNovoDesenho,
    deleteDesenho
}