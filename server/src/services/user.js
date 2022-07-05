const { User, Group, BoMon, Avatar } = require("../database/models");

const getAll = async () => {
    return await User.findAll();
}

const getByMaSo = async maso => {
    if(!maso) return;
    return User.findOne({
        where: { maso: maso}
    })
};

const getGiangVienByMaSo = async maso =>{
    if(!maso) return;
    return await User.findOne({
        where : { maso: maso},
        include: [{
            model: Group,
            where: {
                groupname: 'GIANGVIEN'
            }
        }]
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

const updatePwd = async(maso, pwd) => {
    const user = await User.findOne({ where: { maso }});
    if(user){
        user.mat_khau = pwd;
        return await user.save();
    }
}

const createUser = async (user) => {
    const usr = {};
    usr.maso = user.maso;
    usr.email = user.email;
    usr.ho_ten = user.ho_ten;
    usr.bomon_id = user.bomon_id;
    usr.mat_khau = user.mat_khau;
    console.log(user)
    return;

}
module.exports = {
    getAll,
    getByMaSo,
    getProfileByMaSo,
    updateProfile,
    getUserByMaso,
    updatePwd,
    createUser,
    getGiangVienByMaSo
}