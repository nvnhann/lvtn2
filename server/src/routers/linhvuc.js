import { checkToken } from '../helper/middleware';
const { Router } = require('express');
const router = Router();
const LinhVucController = require('../controller/linhvuc');
const asyncHandler = require('express-async-handler');

router.get('/linhvuc', asyncHandler(LinhVucController.getAll))
router.get('/linhvucadmin', asyncHandler(LinhVucController.getAllAdmin))
router.post('/linhvuc',asyncHandler(LinhVucController.createLinhVuc));
router.put("/linhvuc", asyncHandler(LinhVucController.updateNameById));
router.post("/linhvuc/status", asyncHandler(LinhVucController.updateStatusById));

export default router;