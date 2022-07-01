import { checkToken } from '../helper/middleware';
const asyncHandler = require('express-async-handler');
const { Router } = require('express');
const router = Router();
const UserController = require('../controller/user');
router.get('/user', asyncHandler(UserController.getAll));
router.post('/user/login', asyncHandler(UserController.login));
router.get('/user/profile', [checkToken,asyncHandler(UserController.getProfileByMaSo)]);
router.put('/user/profile', [checkToken, asyncHandler(UserController.updateProfile)]);
router.post('/user/profile/upload', [checkToken,UserController.uploadFile, asyncHandler(UserController.uploadAvatar)])

export default router;