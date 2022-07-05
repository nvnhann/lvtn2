const BoMonService = require('../services/bomon');

const getAll = async(req, res)=>{
    return await res.json(await BoMonService.getAll());
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

module.exports = {
    getAll,
    updateNameById,
    updateStatusById,
    getBomonById
}