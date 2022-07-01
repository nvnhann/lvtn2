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
// const updateProfile = async (maso, profile)=>{
//     return await User.update(profile, {
//         where: maso
//     })

// }
module.exports = {
    getAll,
    getByMaSo,
    getProfileByMaSo,
    
}