const asyncHandler = require("express-async-handler");
const { Router } = require("express");
const router = Router();
const BaiVietController = require("../controller/baiviet");

router.post("/baiviet", asyncHandler(BaiVietController.createBaiViet));

export default router;
