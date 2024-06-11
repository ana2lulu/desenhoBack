const {PrismaClient} = require('@prisma/client');
/*const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library');*/

const prisma = new PrismaClient();

//listar todas os dubladores
const selectAllDublador = async function(){

    let sql = 'select * from tbl_dublador'

    let rsDublador = await prisma.$queryRawUnsafe(sql)

    if(rsDublador.length > 0)
        return rsDublador
    else (error)
       return false

}



module.exports = {
    selectAllDublador
}