const BoMonService = require('../services/bomon');

const getAll = async(req, res)=>{
    return await res.json(await BoMonService.getAll());
}

const getAllAdmin = async(req, res)=>{
    return await res.json(await BoMonService.getAllAdmin());
}

const getBomonById = async (req, res) => {
    return await res.json ( await BoMonService.getBomonById(req.params.id));
}

const updateNameById = async (req, res) => {
    const { id, name } = req.body;
    try {
        await BoMonService.updateNameById(id, name);
        res.status(200).json({
            success: true,
            message: 'Thanh cong'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const updateStatusById = async (req, res)=>{
    const { id, status } = req.body;
    console.log(req.body)
    try {
        await BoMonService.updateStatusById(id,status);
        res.status(200).json({
            success: true,
            message: 'Thanh cong'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const createBoMon = async (req, res) =>{
    try{
        const b = await BoMonService.getBoMonByName(req.body.tenbomon);
        if(b) return res.status(500).send({message: "Tên bộ môn đã tồn tại!"});
        await BoMonService.createBoMon(req.body.tenbomon);
        res.status(200).json({
            success: true,
            message: 'Thanh cong'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

module.exports = {
    getAll,
    updateNameById,
    updateStatusById,
    getBomonById,
    createBoMon,
    getAllAdmin
}