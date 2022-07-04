import { Avatar, Group, KhoaHoc, User } from "../database/models"

const getAllKhoaHoc = async () =>{
    return await KhoaHoc.findAll({
        include: [{
            model: User,
            include: [{
                model: Group,
                where: {
                    groupname: 'GIANGVIEN'
                }
            },{
                model: Avatar
            }],
        }]
    })
}

const getKhoaHocById = async (kh) => {
    console.log(kh)
    return await KhoaHoc.findOne({
        where: {id: kh.id},
        include: [{
            model: User,
            where: {
                id: kh.idgv
            }
        }]
    })
}

module.exports = {
    getAllKhoaHoc,
    getKhoaHocById
}