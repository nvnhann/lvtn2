const express = require('express');
const HocPhanRouting = express.Router();
HocPhanRouting.use(express.json())

const { CommonMethodConstant, ControllerConstant } = require("../constants/api.constant");

const {
    getAll,
    getById,
    create,
    update,
    remove
  } = require('../controllers/HocPhan.controller');


HocPhanRouting.get(CommonMethodConstant.GetAll, getAll);
HocPhanRouting.get(CommonMethodConstant.GetById, getById);
HocPhanRouting.post(CommonMethodConstant.Create, create);
HocPhanRouting.put(CommonMethodConstant.Update, update);
HocPhanRouting.delete(CommonMethodConstant.Delete, remove);

module.exports = { HocPhanRouting };

