const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const KhoaHocController = require('../controller/khoahoc');
router.get('/course', asyncHandler(KhoaHocController.getAllKhoaHoc))
export default router;