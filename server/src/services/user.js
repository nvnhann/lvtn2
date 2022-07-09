const {User, Group, BoMon, Avatar, sequelize} = require("../database/models");
const Sequelize = require('sequelize');
const db = require("../database/models");
const Op = Sequelize.Op;

const getAll = async (search) => {
    if (search) {
        return await User.findAll({
            include: [{
                model: Group
            }, {
                model: BoMon
            }],
            where: {
                [Op.or]: {
                    ho_ten: {
                        [Op.like]: `%${search}%`
                    },
                    maso: {
                        [Op.like]: `%${search}%`
                    },
                }
            }

        });
    } else {
        return await User.findAll({
            include: [{
                model: Group
            }, {
                model: BoMon
            }]
        });
    }
}

const getByMaSo = async maso => {
    if (!maso) return;
    return User.findOne({
        where: {maso: maso},
        include: [{
            model: Group
        }]
    })
};

const getById = async id => {
    if (!id) return;
    return User.findOne({
        where: {id: id},
        include: [{
            model: Group
        }]
    })
};


const getByEmail = async email => {
    if (!email) return;
    return User.findOne({
        where: {email: email},
        include: [{
            model: Group
        }]
    })
};


const getGiangVienByMaSo = async maso => {
    if (!maso) return;
    return await User.findOne({
        where: {maso: maso},
        include: [{
            model: Group,
            where: {
                groupname: 'GIANGVIEN'
            }
        }]
    })
}

const getProfileByMaSo = async maso => {
    if (!maso) return;
    return User.findOne({
        where: {maso: maso},
        include: [{
            model: Group
        }, {
            model: BoMon
        }, {
            model: Avatar
        }]
    })
}
const updateProfile = async (maso, profile) => {
    const user = await User.findOne({where: {maso}});
    if (user) {
        user.ho_ten = profile.ho_ten;
        user.dia_chi = profile.dia_chi;
        user.sdt = profile.sdt;
        user.gioi_tinh = profile.gioi_tinh;
        return await user.save();
    }
}

const getUserByMaso = async maso => {
    return await User.findOne({where: {maso}})
}

const updatePwd = async (maso, pwd) => {
    const user = await User.findOne({where: {maso}});
    if (user) {
        user.mat_khau = pwd;
        return await user.save();
    }
}

const createUser = async (user) => {
    const usr = {};
    usr.maso = user.maso;
    usr.email = user.email;
    usr.ho_ten = user.ho_ten;
    usr.mat_khau = user.mat_khau;
    usr.gioi_tinh = usr.gioi_tinh;

    const u = await User.create(usr);
    const g = await Group.findOne({where: {id: user.gId}});
    const b = await BoMon.findOne({where: {id: user.bId}});
    await g.setUser(u, {through: 'membership'});
    await b.setUser(u);
    console.log(user)
    return;

}

const eidtUser = async (user) => {
    const usr = await User.findOne({
        where: {id: user.id},
        include: [{
            model: Group
        }]
    });
    usr.maso = user.maso;
    usr.email = user.email;
    usr.ho_ten = user.ho_ten;
    usr.gioi_tinh = usr.gioi_tinh;
    const g = await Group.findOne({where: {id: user.gId}});
    const b = await BoMon.findOne({where: {id: user.bId}});
    await sequelize.query('DELETE FROM membership WHERE `membership`.`user_id` = '+usr.id+' AND `membership`.`group_id` = '+usr.groups[0].id)
    await g.addUser(usr, {through: 'membership'});
    await b.addUser(usr);
    await usr.save();
    return;

}
const setActiveUser = async (id, active) => {
    await db.sequelize.query('UPDATE `user` SET `active` = '+active+' WHERE `user`.`id` = '+id);
}
module.exports = {
    getAll,
    getByMaSo,
    getProfileByMaSo,
    updateProfile,
    getUserByMaso,
    updatePwd,
    createUser,
    getGiangVienByMaSo,
    getByEmail,
    eidtUser,
    getById,
    setActiveUser
}