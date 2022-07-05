import { BoMon, Group, User } from "../database/models"

const getAll = async () =>{
    return await BoMon.findAll();
}

const getBomonById = async (id) => {
    return await BoMon.findByPk(id, {
        include: [{
            model: User,
            include: [{
                model: Group,
                where: {
                    groupname: 'GIANGVIEN'
                }
            }]
        }]
    })
}

const updateNameById = async(id, name) => {
    if(id && name){
        const bm = await BoMon.findOne({
            where: { id: id}
        });

        bm.name = name;
        return await bm.save();
    }
}

const updateStatusById = async(id, status) => {
    if(id !== undefined && status !== undefined){
        const bm = await BoMon.findOne({
            where: { id: id}
        });

        bm.active = status;
        return await bm.save();
    }
}


module.exports = {
    getAll,
    updateNameById,
    updateStatusById,
    getBomonById
}