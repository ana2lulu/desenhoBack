const {PrismaClient} = require('@prisma/client');
/*const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library');*/

const prisma = new PrismaClient();


// listar todas as personas
const getListarPersonas = async function(){

    let sql = 'select * from tbl_personas'

    let rsPersonas = await prisma.$queryRawUnsafe(sql)

    if(rsPersonas.length > 0)
        return rsPersonas 
    else (error)
       return false

}

const insertPersonas = async function(dadosPersonas){
    try{

        let sql

        if(dadosPersonas){
            sql = `insert into tbl_personas (
              id_dublador,
              nome,
              biografia,
              imagem
            ) values(

                '${dadosPersonas.id_dublador}',
                '${dadosPersonas.nome}',
                '${dadosPersonas.biografia}',
                '${dadosPersonas.imagem}'
            )`
        } 

        let result = await prisma.$executeRawUnsafe(sql)
console.log(result);
        if(result)
            return true
        else
            return false


    } catch(erro){
        console.log(erro)
        return false
    }
}




// buscar pelo id 
const getBuscarIdPersonas = async function(id_personas) {
    let sql = `select * from tbl_personas where id_personas = ${id_personas}`

    try {
        let rsPersonasid = await prisma.$queryRawUnsafe(sql)

        if(rsPersonasid.length > 0)
            return rsPersonasid
        else
            return false
    } catch (error) {
        console.error(error)
        return false
    }
}


//deletar personas

const deletePersonas = async function(id_personas) {
    let sql = `DELETE FROM tbl_personas WHERE id_personas = ?`;

    try {
        let result = await prisma.$executeRawUnsafe(sql, id_personas);

        if (result) // Se a operação foi bem-sucedida
            return true;
        else
            return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}


module.exports = {
   getListarPersonas,
    insertPersonas,
    getBuscarIdPersonas,
    deletePersonas
    
}