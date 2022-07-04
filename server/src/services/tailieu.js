const db = require("../database/models");
const { TaiLieu, User, LinhVuc } = require("../database/models")

const createTaiLieu = async(maso, tailieu) => {
    let tl = {};
    tl.name = tailieu.tentailieu;
    tl.mota = tailieu.mota;
    tl.path = tailieu.file.filename;
    let transaction = null;
    
        try {
            transaction = await db.sequelize.transaction();
            const user = await User.findOne({
                where: {
                    maso: maso
                }
            });
            if(user){
                tl = await TaiLieu.create(tl);
                console.log(tl.id)
                await tl.addUser(user, {through: 'ct_tai_lieu'});
                tailieu.lv.map(async e => {
                    const lv = await LinhVuc.findByPk(e.id);
                    await tl.addLinhvuc(lv, {through: 'ct_lv'})
                });
            }
            transaction.commit();
        } catch (error) {
            if(transaction) transaction.rollback;
            console.log(error)
        }
}

const getTailieuByMaso = async (maso) =>{
    return await TaiLieu.findAll({
        include: [{
            model: User,
            where: { maso: maso}
        },{
            model: LinhVuc
        }]
    })
}

const getTailieuById = async (id) =>{
    return await TaiLieu.findByPk(id,{
        include: [{
            model: User,
        },{
            model: LinhVuc
        }]
    })
}

const fs = require('fs')
 const getFileByName = async(filename) => {
    return fs.readFileSync(__dirname+'/../../public/documents/'+filename, "utf8");

}


module.exports = {
    createTaiLieu,
    getTailieuByMaso,
    getTailieuById,
    getFileByName
}