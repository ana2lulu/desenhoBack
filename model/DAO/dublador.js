const {PrismaClient} = require('@prisma/client');
/*const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library');*/

const prisma = new PrismaClient();

//listar todas os dubladores
const getlistarDublador = async function(){

    let sql = 'select * from tbl_dublador'

    let rsDublador = await prisma.$queryRawUnsafe(sql)

    if(rsDublador.length > 0)
        return rsDublador
    else (error)
       return false

}



// buscar pelo id 
const getBuscarIdDublador = async function(id_dublador) {
    let sql = `select * from tbl_dublador where id_dublador = ${id_dublador}`

    try {
        let rsdublador = await prisma.$queryRawUnsafe(sql)

        if(rsdublador.length > 0)
            return rsdublador
        else
            return false
    } catch (error) {
        console.error(error)
        return false
    }
}


//Inserir Dublador



const insertDublador = async function(dadosDublador){
    try{

        let sql

        if(dadosDublador){
            sql = `insert into tbl_dublador (
              nome,
              biografia,
              imagem
            ) values(

                '${dadosDublador.nome}',
                '${dadosDublador.biografia}',
                '${dadosDublador.imagem}'
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


const deleteDublador = async function(id) {
    let sql = `DELETE FROM tbl_dublador WHERE id_dublador = ?`;

    try {
        let result = await prisma.$executeRawUnsafe(sql, id);

        if (result) // Se a operação foi bem-sucedida
            return true;
        else
            return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const deletePersonasDublador = async function(id) {
    let sql = `DELETE FROM tbl_personas where id_dublador = ?`;
    try{
        let result = await prisma.$executeRawUnsafe(sql, id);

        
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
    getlistarDublador,
    getBuscarIdDublador,
    insertDublador,
    deletePersonasDublador,
    deleteDublador
}