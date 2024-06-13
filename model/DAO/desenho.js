const {PrismaClient} = require('@prisma/client');
/*const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library');*/

const prisma = new PrismaClient();


//listar todos os desenhos

const getListarDesenho = async function(){

    let sql = 'select * from tbl_desenho'

    let rsDesenho = await prisma.$queryRawUnsafe(sql)

    if(rsDesenho.length > 0)
        return rsDesenho
    else (error)
        return false

}

//buscar id
const getBuscarIdDesenho = async function(idDesenho) {
    let sql = `select * from tbl_desenho where id = ${idDesenho}`;

    try {
        let rsDesenhoid = await prisma.$queryRawUnsafe(sql);

        if (rsDesenhoid.length > 0)
            return rsDesenhoid;
        else
            return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};


//inserir desenho
const insertDesenho = async function(dadosDesenho){
    try{

        let sql

        if(dadosDesenho){
            sql = `insert into tbl_desenho (
              id_personas,
              nome,
              sinopse,
              foto_capa,
              data_lancamento
            ) values(
            

                '${dadosDesenho.id_personas}',
                '${dadosDesenho.nome}',
                '${dadosDesenho.sinopse}',
                '${dadosDesenho.foto_capa}',
                '${dadosDesenho.data_lancamento}'

            )`
        } 
         console.log(sql)

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


//delete desenho

const deletePersonasDesenho = async function(id_desenho) {
    let sql = `DELETE FROM tbl_personas WHERE id_desenho = ${id_desenho}`;

    try {
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) // Se a operação foi bem-sucedida
            return true;
        else
            return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}



module.exports ={
    getListarDesenho,
    getBuscarIdDesenho,
    insertDesenho,
    deletePersonasDesenho

}
