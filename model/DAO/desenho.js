const {PrismaClient} = require('@prisma/client');
/*const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library');*/

const prisma = new PrismaClient();


//listar todos os desenhos
const selectALLDesenho = async function(){

    let sql = 'select * from tbl_desenho'

    let rsDesenho = await prisma.$queryRawUnsafe(sql)

    if(rsDesenho.length > 0)
        return rsDesenho
    else (error)
        return false

}

module.exports ={
    selectALLDesenho
}