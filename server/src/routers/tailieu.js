import { checkToken } from '../helper/middleware';
const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const TaiLieuController = require('../controller/tailieu');

router.post('/tailieu', [checkToken, TaiLieuController.uploadFile, TaiLieuController.createTaiLieu])
router.get('/tailieugv/:maso', [TaiLieuController.getTailieuByMaso]);
router.post('/tailieu/active', asyncHandler(TaiLieuController.setActiveTaiLieu))
router.post('/tailieu/save', asyncHandler(TaiLieuController.saveTaiLieu));
router.get('/tailieu/save',[ checkToken,asyncHandler(TaiLieuController.getTaiLieuSave)])
router.get('/tailieu/:id', [ TaiLieuController.getTailieuById])
router.get('/tailieu/file/:name', [ TaiLieuController.getFileByName])
export default router;