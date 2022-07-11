import { checkToken } from '../helper/middleware';
const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const TaiLieuController = require('../controller/tailieu');

router.post('/tailieu', [checkToken, TaiLieuController.uploadFile, TaiLieuController.createTaiLieu])
router.get('/tailieugv/:maso', [TaiLieuController.getTailieuByMaso]);
router.get('/tailieulv/:linhvuc', [TaiLieuController.getTaiLieuByLinhVuc]);
router.post('/tailieu/active', asyncHandler(TaiLieuController.setActiveTaiLieu))
router.post('/tailieu/save', asyncHandler(TaiLieuController.saveTaiLieu));
router.post('/tailieu/unsave', asyncHandler(TaiLieuController.unSaveTaiLieu));
router.get('/tailieu/save',[ checkToken,asyncHandler(TaiLieuController.getTaiLieuSave)])
router.get('/tailieu/:id', [ TaiLieuController.getTailieuById])
router.delete('/tailieu/:id', [ TaiLieuController.deleteTaiLieuById])
router.get('/tailieu/file/:name', [ TaiLieuController.getFileByName]);
router.get('/tailieu/goiy/:id', TaiLieuController.getGoiY);
export default router;