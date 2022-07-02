const KhoaHocService = require('../services/khoahoc');
const getAllKhoaHoc = async (req, res)=>{
    try {
        return res.json(await KhoaHocService.getAllKhoaHoc())
    } catch (error) {
        console.log(error);
        res.status(400).json({
          code: "Error",
          message: error.message
        });
    }
}

module.exports = {
    getAllKhoaHoc
}