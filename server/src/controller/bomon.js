const BoMonService = require('../services/bomon');

const getAll = async(req, res)=>{
    return await res.json(await BoMonService.getAll());
}

module.exports = {
    getAll
}