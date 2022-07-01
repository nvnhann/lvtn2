import { checkToken } from '../helper/middleware';

const { Router } = require('express');
const router = Router();
const UserController = require('../controller/user');
router.get('/user', UserController.getAll);
router.post('/user/login', UserController.login);
router.get('/user/profile', [checkToken,UserController.getProfileByMaSo])
export default router;