const asyncHandler = require("express-async-handler");
const { Router } = require("express");
const router = Router();
const BoMonController = require("../controller/bomon");
router.get("/bomon", asyncHandler(BoMonController.getAll));

export default router;
