import { checkToken } from '../helper/middleware';
const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const UserController = require('../controller/user');
router.get('/user', asyncHandler(UserController.getAll));
router.post('/user', asyncHandler(UserController.createUser));
router.put('/user', asyncHandler(UserController.editUser));
router.post('/user/resetpwd', asyncHandler(UserController.resetPwd))
router.post('/user/active', asyncHandler(UserController.setActiveUser))
router.post('/user/login', asyncHandler(UserController.login));
router.get('/user/profile/:maso', [checkToken,asyncHandler(UserController.getProfileByMaSo)]);
router.put('/user/profile', [checkToken, asyncHandler(UserController.updateProfile)]);
router.post('/user/forgotpass', [checkToken, UserController.updatePwd]);
router.get('/user/search/:search', asyncHandler(UserController.userSearch))
export default router;