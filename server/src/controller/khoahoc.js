const KhoaHocService = require('../services/khoahoc');
const UserService = require('../services/user');



const getAllKhoaHoc = async (req, res)=>{
    try {
        return res.json(await KhoaHocService.getAllKhoaHoc(req.query.pageURL))
    } catch (error) {
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    }
}

const getKhoaHocById = async (req, res) =>{
    try {
        return res.json(await KhoaHocService.getKhoaHocById(req.query))
    } catch (error) {
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    } 
}

const createKhoaHoc = async (req, res) => {
    try {
        const { tenkhoahoc, giangvien, makhoahoc} = req.body;
        const gv = await UserService.getGiangVienByMaSo(giangvien);
        if(!gv) return res.status(404).json({message: 'Giảng viên không tồn tại!'});
        await KhoaHocService.createKhoahoc(makhoahoc, tenkhoahoc, giangvien);
        return res.status(200).json({message: 'Thành công!'})
    } catch (error) {
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    }
}

const setActiveKhoahoc = async (req, res) => {
   try {
    const { idkh, active} = req.body;
    await KhoaHocService.setActiveKhoahoc(idkh,active);
    return res.status(200).json({message: 'Thành công!'})
   } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "Error",
      message: error.message
    });
   }
}

const createKHbyFile = async (req, res) =>{
   try {
    await KhoaHocService.createKHbyFile(req.file.filename)
    res.status(200).json({message: 'Thanh cong'});
   } catch (error) {
    console.log(error);
    res.status(400).json({
        code: "Error",
        message: error.message
      });
   }
    
}
module.exports = {
    getAllKhoaHoc,
    getKhoaHocById,
    createKhoaHoc,
    setActiveKhoahoc,
    createKHbyFile
}