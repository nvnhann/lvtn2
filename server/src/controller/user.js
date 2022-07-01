const  UserService  = require('../services/user');
const AuthenticateService = require('../services/authentication');
const TokenUtils = require('../helper/token-utils');

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

    // return res.json({
    //     id: rs.id
    // })
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
        const { maso } = req.user.maso;
        const { profile } = req.body;
        console.log(profile)
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
    getProfileByMaSo
}