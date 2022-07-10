const {User, Group, BoMon, Avatar, sequelize, TaiLieu, LinhVuc} = require("../database/models");
const db = require("../database/models");
const Sequelize = require('sequelize');
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
    usr.gioi_tinh = user.gioi_tinh;

    const u = await User.create(usr);
    const g = await Group.findOne({where: {id: user.gId}});
    const b = await BoMon.findOne({where: {id: user.bId}});
    await g.setUser(u, {through: 'membership'});
    await b.setUser(u);
    console.log(usr)
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
    usr.gioi_tinh = user.gioi_tinh;
    const g = await Group.findOne({where: {id: user.gId}});
    const b = await BoMon.findOne({where: {id: user.bId}});
    await sequelize.query('DELETE FROM membership WHERE `membership`.`user_id` = ' + usr.id + ' AND `membership`.`group_id` = ' + usr.groups[0].id)
    await g.addUser(usr, {through: 'membership'});
    await b.addUser(usr);
    await usr.save();
    return;

}
const setActiveUser = async (id, active) => {
    await db.sequelize.query('UPDATE `user` SET `active` = ' + active + ' WHERE `user`.`id` = ' + id);
}

const userSearch = async (search) => {
    let rs = {};
    const gv = await User.findAll({
        where: {
            ho_ten: {
                [Op.like]: `%${search}%`
            },
            active: 1
        }
    });
    rs.taikhoan = gv;
    const kh = await db.sequelize.query('SELECT kh.ma_khoa_hoc, ctkh.id, kh.ten_khoa_hoc, u.ho_ten, u.maso, u.id as idgv, ctkh.active  , avatar.path_name \
    from khoahoc kh, lvtn2.user u LEFT JOIN avatar ON u.id = avatar.user_id, chi_tiet_kh ctkh, `group` g, membership m \
    WHERE (kh.id = ctkh.khoahoc_id and u.id = ctkh.user_id AND m.user_id = ctkh.user_id AND m.group_id = g.id AND g.groupname = "GIANGVIEN") AND (kh.ten_khoa_hoc like '+`'%${search}%'` + `OR u.ho_ten like '%${search}%')`,{type: db.sequelize.QueryTypes.SELECT})
    rs.kh = kh;
    const tl = await TaiLieu.findAll({
        where: {
            name: {
                [Op.like]: `%${search}%`
            },
            active: 1
        },
        include: [{
            model: User,
            where: {
                active: 1,
            }
        }]
    });
    rs.tl =tl
    const lv = await LinhVuc.findAll({
        where: {
            name: {
                [Op.like]: `%${search}%`
            },
            active: 1
        }
    }) ;
    rs.lv = lv
    return rs;

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
    setActiveUser,
    userSearch
}