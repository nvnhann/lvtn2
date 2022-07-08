const BaiVietService = require('../services/baiviet')
export  const createBaiViet = async (req, res) =>{
    try{
        await BaiVietService.createBaiViet(req.body.noidung, req.body.idkh, req.body.tailieu);
        res.status(200).json({msg: 'Thành công'})
    }catch (e) {
        res.status(500).json({
            error: e
        })
    }
}