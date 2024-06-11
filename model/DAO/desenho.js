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

// buscar pelo id 
const selectALLDesenhobyId = async function(id){

    let sql = `select * from tbl_desenho where id = ${id}`

    console.log(sql);
    let rsDesenhoid = await prisma.$queryRawUnsafe(sql)

    if(rsDesenhoid.length > 0)
        return rsDesenhoid
    else(error)
        return false
}
module.exports ={
    selectALLDesenho,
    selectALLDesenhobyId

}
