import db, { Avatar, CTKH, Group, KhoaHoc, User } from "../database/models"

const getAllKhoaHoc = async (pageURL) =>{
    let limit = 1000;
   if(pageURL){
         limit = 8 * pageURL
    }

    return await db.sequelize.query('SELECT kh.ma_khoa_hoc, ctkh.id, kh.ten_khoa_hoc, u.ho_ten, u.maso, u.id as idgv, ctkh.active  , avatar.path_name \
    from khoahoc kh, lvtn2.user u LEFT JOIN avatar ON u.id = avatar.user_id, chi_tiet_kh ctkh, `group` g, membership m \
    WHERE kh.id = ctkh.khoahoc_id and u.id = ctkh.user_id AND m.user_id = ctkh.user_id AND m.group_id = g.id AND g.groupname = "GIANGVIEN" LIMIT ' +limit,  { type: db.sequelize.QueryTypes.SELECT })
}

const setActiveKhoahoc = async (idkh,idgv,active) => {
    return await db.sequelize.query('UPDATE `chi_tiet_kh` SET `active` = '+active+' WHERE `chi_tiet_kh`.`user_id` = '+idgv+' AND `chi_tiet_kh`.`khoahoc_id` = '+ idkh);
}

const getKhoaHocById = async (kh) => {
    const rs = {};

    let khh = await db.sequelize.query('SELECT ctkh.id as idkh, ctkh.user_id, kh.ma_khoa_hoc, kh.ten_khoa_hoc, u.maso, u.ho_ten, avatar.path_name \
    from chi_tiet_kh ctkh INNER JOIN user u ON ctkh.user_id = u.id INNER JOIN khoahoc kh ON ctkh.khoahoc_id = kh.id LEFT JOIN avatar ON avatar.user_id = u.id \
    WHERE ctkh.id = '+kh.id, { type: db.sequelize.QueryTypes.SELECT });

    rs.kh = khh[0]

    rs.member = await db.sequelize.query('SELECT user.maso, user.ho_ten, avatar.path_name \
    from tv_kh INNER JOIN user on tv_kh.user_id = user.id LEFT JOIN avatar ON user.id = avatar.user_id\
    WHERE tv_kh.chi_tiet_kh_id = '+kh.id, { type: db.sequelize.QueryTypes.SELECT });

    return rs;
}

const createKhoahoc = async (makhoahoc, tenkhoahoc, giangvien) =>{
    const gv = await User.findOne({ where: {maso: giangvien}})
    let kh = await KhoaHoc.findOne({
        where: {ma_khoa_hoc: makhoahoc}
    });
    if(kh){
      return await kh.addUser(gv,{through: 'chi_tiet_kh'})
    }else{
        const k = {
            ma_khoa_hoc: makhoahoc,
            ten_khoa_hoc: tenkhoahoc
        }
        kh = await KhoaHoc.create(k);
        return await kh.addUser(gv,{through: 'chi_tiet_kh'})
    }

}

const XLSX = require('xlsx')

const createKHbyFile = async file =>{
    const path =  __dirname + "/../../public/documents/" + file;
    const workbook = XLSX.readFile(path);
    let sheet_name_list = workbook.SheetNames;
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    xlData.map(async e => {
        if(e.MaKhoaHoc && e.TenKhoaHoc && e.MaSoCB){
            await createKhoahoc(e.MaKhoaHoc, e.TenKhoaHoc, e.MaSoCB)
        }
    })


}
module.exports = {
    getAllKhoaHoc,
    getKhoaHocById,
    createKhoahoc,
    setActiveKhoahoc,
    createKHbyFile

}