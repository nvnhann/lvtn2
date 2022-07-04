const LinhVucService = require('../services/linhvuc');

export const getAll = async (req, res) => {
    res.status(200).json(await LinhVucService.getAll());
}