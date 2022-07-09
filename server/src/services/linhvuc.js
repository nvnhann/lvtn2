import {BoMon, Group, LinhVuc, User} from "../database/models"

export const getAll = async () =>{
    return await LinhVuc.findAll({
        order: [
            ['id', 'DESC']]
    });
}


export const getLinhVucById = async (id) => {
    return await LinhVuc.findByPk(id)
}

export const getLinhVucByName = async (name) =>{
    return await LinhVuc.findOne({
        where: {
            name: name
        }
    })
}

export const updateNameById = async (id, name) => {
    if (id && name) {
        const bm = await LinhVuc.findOne({
            where: {id: id}
        });

        bm.name = name;
        return await bm.save();
    }
}

export const updateStatusById = async (id, status) => {
    if (id !== undefined && status !== undefined) {
        const bm = await LinhVuc.findOne({
            where: {id: id}
        });

        bm.active = status;
        return await bm.save();
    }
}

export const createLinhVuc= async (tenlv) => {
    await LinhVuc.create({name: tenlv});
}
