const { findOne } = require("../database-utility/utils");
const { User, Group, BoMon, Avatar } = require("../database/models");
const getAll = async () => {
    return await User.findAll();
}

const getByMaSo = async maso => {
    if(!maso) return;
    return User.findOne({
        where: { maso: maso}
    })
}

const getProfileByMaSo = async maso =>{
    if(!maso) return;
    return User.findOne({
        where: { maso: maso},
        include: [{
            model: Group
        },{
            model: BoMon
        },{
            model: Avatar
        }]
    })
}
const updateProfile = async (maso, profile)=>{
    const user = await User.findOne({ where: {maso}});
   if(user){
        user.ho_ten = profile.ho_ten;
        user.dia_chi = profile.dia_chi;
        user.sdt = profile.sdt;
        user.gioi_tinh = profile.gioi_tinh;
       return await user.save();
   }
}

const getUserByMaso = async maso =>{
    return await User.findOne({ where: {maso}})
}
module.exports = {
    getAll,
    getByMaSo,
    getProfileByMaSo,
    updateProfile,
    getUserByMaso
}