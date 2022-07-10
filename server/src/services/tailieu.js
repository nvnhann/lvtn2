const db = require("../database/models");
const {TaiLieu, User, LinhVuc} = require("../database/models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const createTaiLieu = async (maso, tailieu) => {
    let tl = {};
    tl.name = tailieu.tentailieu;
    tl.mota = tailieu.mota;
    tl.path = tailieu.file.filename;
    let transaction = null;

    try {
        transaction = await db.sequelize.transaction();
        const user = await User.findOne({
            where: {
                maso: maso,
            },
        });

        if (user) {
            tl = await TaiLieu.create(tl);
            await user.addTailieu(tl);
            tailieu.lv.map(async (e) => {
                const lv = await LinhVuc.findByPk(e.id);
                await tl.addLinhvuc(lv, {through: "ct_lv"});
            });
        }
        transaction.commit();
    } catch (error) {
        if (transaction) transaction.rollback;
        console.log(error);
    }
};

const getTailieuByMaso = async (maso, search) => {
    if (search) {
        return await TaiLieu.findAll({
            include: [
                {
                    model: User,
                    where: {maso: maso},
                },
                {
                    model: LinhVuc,
                },
            ],
            where: {
                name: {
                    [Op.like]:`%${search}%`
                }
            }
        });
    } else {
        return await TaiLieu.findAll({
            include: [
                {
                    model: User,
                    where: {maso: maso},
                },
                {
                    model: LinhVuc,
                },
            ],
        });
    }
};

const getTaiLieuByLinhVuc = async(name) =>{
    return await TaiLieu.findAll({
        where:{
            active: 1
        },
        include: [
            {
                model: User,
                where: {
                    active: 1
                }
            },
            {
                model: LinhVuc,
                where: {
                    active: 1,
                    name: {
                        [Op.like]: `%${name}%`
                    },
                }
            },
        ],
    });
}

const getTailieuById = async (id) => {
    return await TaiLieu.findByPk(id, {
        include: [
            {
                model: User,
            },
            {
                model: LinhVuc,
            },
        ],
    });
};

const fs = require("fs");
const getFileByName = async (filename) => {
    return fs.readFileSync(
        __dirname + "/../../public/documents/" + filename,
        "utf8"
    );
};

const deleteTaiLieuById = async id =>{
    await TaiLieu.destroy({
        where: {
            id: id
        }
    })
}

const setActiveTaiLieu = async (id, active) => {
    await db.sequelize.query('UPDATE `tailieu` SET `active` = '+active+' WHERE `tailieu`.`id` = '+ id);
}

const saveTaiLieu = async (id, idtl) =>{
    const u = await  User.findOne({where: { id: id}});
    const tl = await TaiLieu.findOne({where:{ id: idtl}});
    await  tl.addUser(u, {through: 'tl_luu'})

}

const unSaveTaiLieu = async (id, idtl) =>{
    return await db.sequelize.query("DELETE FROM tl_luu WHERE `tl_luu`.`user_id` = "+id+" AND `tl_luu`.`tailieu_id` = "+idtl)

}

const getTaiLieuSave = async (maso) =>{
    return await User.findOne({
        where: { maso : maso},
        include: [{
            model: TaiLieu,
            where: {
              active: 1
            },
            include: [{
                model: LinhVuc
            }, {model: User}]
        }]
    })
}

module.exports = {
    createTaiLieu,
    getTailieuByMaso,
    getTailieuById,
    getFileByName,
    deleteTaiLieuById,
    setActiveTaiLieu,
    saveTaiLieu,
    getTaiLieuSave,
    getTaiLieuByLinhVuc,
    unSaveTaiLieu
};
