const asyncHandler = require("express-async-handler");
const { Router } = require("express");
const router = Router();
const BoMonController = require("../controller/bomon");
router.get("/bomon", asyncHandler(BoMonController.getAll));
router.post("/bomon", asyncHandler(BoMonController.updateNameById));
router.post("/bomon/status", asyncHandler(BoMonController.updateStatusById));

export default router;
