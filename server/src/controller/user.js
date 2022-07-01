const  UserService  = require('../services/user');
const AuthenticateService = require('../services/authentication');
const TokenUtils = require('../helper/token-utils');
const multer = require('multer');
const db = require('../database/models');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/avatar')
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname+'-'+ Date.now()+file.originalname);
    }
});

const uploadFile = multer({storage: storage}).single('avatar');

const uploadAvatar = async (req, res) => {
    let transaction = null;
   try {
    transaction = await db.sequelize.transaction();
    const { id } = req.user;
    const avatarFile = req.file;
    let avt = {};
    avt.path_name = avatarFile.filename;
    avt.src = avatarFile.path;
    console.log(avt)
    const user = await db.User.findOne({ where: { id }})
    const oldAvt = await db.Avatar.findOne({ where: {userId: id}})
    if(oldAvt){
        console.log('====================update')
        await db.Avatar.update(avt, {where: {userId: id }})
    } else{
        avt = await db.Avatar.create(avt);
        await avt.setUser(user);
    }
    await transaction.commit();
    res.status(200).json({ success: true, msg: 'Thanh cong'})
    
   } catch (error) {
    if(transaction) await transaction.rollback();
    console.log(error)
   }
}

const getAll = async (req, res)=>{
    return res.json(await UserService.getAll())
}

const getProfileByMaSo = async (req, res)=>{
    try {
        const rs = await UserService.getProfileByMaSo(req.user.maso);
        if(rs){
            res.json({
                id: rs.id,
                maso: rs.maso,
                ho_ten: rs.ho_ten,
                email: rs.email,
                sdt: rs.sdt,
                dia_chi: rs.dia_chi,
                ngay_sinh: rs.ngay_sinh,
                gioi_tinh: rs.gioi_tinh,
                bomon: rs.bomon.name,
                role: rs.groups,
                avatar: rs.avatar
            })
        }
        else{
            res.json({message: 'User not found!'})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    }
}

const login = async (req, res) => {
    try{
        const { maso, pwd } = req.body;
        console.log('maso', maso)
        const user = await AuthenticateService.verifyUser(maso,pwd);
        console.log(user)
        if (user !== null) {
            let token = TokenUtils.createToken(user);
            res.status(200).json({
              code: "Success",
              data: token
            });
          } else {
            res.status(400).json({
              code: "Error",
              message: "Tên đăng nhập hoặc mật khẩu sai"
            });
          }
    }catch(error){
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { maso } = req.user;
        const { profile } = req.body;
        console.log(maso, profile)
        await UserService.updateProfile(maso, profile);
        res.status(200).json({success: true, msg: 'Thanh cong'})
    } catch (error) {
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    }
}

module.exports = {
    getAll,
    login,
    getProfileByMaSo,
    updateProfile,
    uploadFile,
    uploadAvatar
}