const {PrismaClient} = require('@prisma/client');
/*const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library');*/

const prisma = new PrismaClient();


// listar todas as personas
const selectAllpersonas = async function(){

    let sql = 'select * from tbl_personagem'

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
            sql = `insert into tbl_personagem (
              id_dublador,
              nome,
              data_lancamento,
              sinopse,
              foto_capa,
              id_personagem
            ) values(

                '${dadosPersonas.id_dublador}',
                '${dadosPersonas.nome}',
                '${dadosPersonas.data_lancamento}',
                '${dadosPersonas.sinopse}',
                '${dadosPersonas.foto_capa}',
                '${dadosPersonas.id_personagem}'


            )`
        } 

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false


    } catch(erro){
        console.log(erro)
        return false
    }
}

module.exports = {
    selectAllpersonas,
    insertPersonas
}