const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const KhoaHocController = require('../controller/khoahoc');
const TaiLieuController = require('../controller/tailieu');

router.get('/course', asyncHandler(KhoaHocController.getAllKhoaHoc))
router.post('/course', asyncHandler(KhoaHocController.createKhoaHoc));
router.post('/course/file', [TaiLieuController.uploadFile,asyncHandler(KhoaHocController.createKHbyFile)])

router.post('/course/active', [asyncHandler(KhoaHocController.setActiveKhoahoc)])
router.get('/course/detail', asyncHandler(KhoaHocController.getKhoaHocById))
export default router;