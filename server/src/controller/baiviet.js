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

export const getBaiVietByKH = async (req, res) =>{
    try{
        res.status(200).json(await BaiVietService.getBaiVietByKH(req.params.id))
    }catch (e){
        console.log(e);
        res.status(500).json({message: e})
    }
}

export const setActiveBaiViet = async (req, res) => {
    try{
        await BaiVietService.setActiveBaiViet(req.body.id, req.body.active);
        res.status(200).json({message: 'Thành công'})
    }  catch (e) {
        console.log(e);
        res.status(200).json({message: e})
    }
}

export const deleteBaiViet = async (req, res)=>{
    try{
        await BaiVietService.deleteBaiViet(req.params.id);
        res.status(200).json({message: 'Thành công'})
    }  catch (e) {
        console.log(e);
        res.status(200).json({message: e})
    }
}