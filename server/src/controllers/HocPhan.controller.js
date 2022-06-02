const { HocphanService } = require('../services/HocPhan.service');
const _hocphanService = new HocphanService();

const getAll = (async (req, res) => {
    const rs = await _hocphanService.getAll();
    res.status(rs.errorCode).json(rs.results);
});

const getById = (async (req, res) => {
    const rs = await _hocphanService.getById(req.params.id);
    res.status(rs.errorCode).json(rs.results);
});

const create = (async (req, res) => {
    const rs = await _hocphanService.create(req.body);
    res.status(rs.errorCode).send(rs.results);
});

const update = (async (req, res) => {
    const rs = await _hocphanService.update(parseInt(req.params.id), req.body)
    res.status(rs.errorCode).send(rs.results);
});

const remove = ((req, res) => {
    const rs = _hocphanService.delete(req.params.id);
    res.send(rs.results);
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}