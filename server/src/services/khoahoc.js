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

module.exports = {
    getAllKhoaHoc
}