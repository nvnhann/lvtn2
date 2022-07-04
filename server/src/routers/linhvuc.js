import { checkToken } from '../helper/middleware';
const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const LinhVucController = require('../controller/linhvuc');

router.get('/linhvuc', asyncHandler(LinhVucController.getAll))

export default router;