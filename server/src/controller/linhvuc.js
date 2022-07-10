
const LinhVucService = require('../services/linhvuc');

export const getAll = async (req, res) => {
    res.status(200).json(await LinhVucService.getAll());
}

export const createLinhVuc = async (req, res) =>{
    try{
        const b = await LinhVucService.getLinhVucByName(req.body.tenbomon);
        if(b) return res.status(500).send({message: "Tên lĩnh vực đã tồn tại!"});
        await LinhVucService.createLinhVuc(req.body.tenbomon);
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


export const updateNameById = async (req, res) => {
    const { id, name } = req.body;
    try {
        await LinhVucService.updateNameById(id, name);
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

export const updateStatusById = async (req, res)=>{
    const { id, status } = req.body;
    console.log(req.body)
    try {
        await LinhVucService.updateStatusById(id,status);
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
