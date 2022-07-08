const asyncHandler = require("express-async-handler");
const { Router } = require("express");
const router = Router();
const BaiVietController = require("../controller/baiviet");

router.get('/baiviet/:id', asyncHandler(BaiVietController.getBaiVietByKH))
router.post("/baiviet", asyncHandler(BaiVietController.createBaiViet));
router.post("/baiviet/active", asyncHandler(BaiVietController.setActiveBaiViet));
export default router;
