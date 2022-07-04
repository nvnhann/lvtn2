const TaiLieuService = require("../services/tailieu");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documents");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const uploadFile = multer({ storage: storage }).single("document");

const createTaiLieu = async (req, res) => {
  try {
    const tailieu = JSON.parse(req.body.tailieu);
    const tl = {};
    tl.tentailieu = tailieu.tentailieu;
    tl.mota = tailieu.mota;
    tl.file = req.file;
    tl.lv = tailieu.lv;
    console.log("===================================", tl);
    await TaiLieuService.createTaiLieu(req.user.maso, tl );
    res.status(200).json({ success: true, msg: "thanh cong" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "Error",
      message: error.message,
    });
  }
};

const getTailieuByMaso = async (req, res) => {
  const { maso } = req.user;
  try {
    return res.status(200).json(await TaiLieuService.getTailieuByMaso(maso));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "Error",
      message: error.message,
    });
  }
};
const getTailieuById = async (req, res) => {
  const { id } = req.params;
  try {
    return res.status(200).json(await TaiLieuService.getTailieuById(id));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "Error",
      message: error.message,
    });
  }
};

const getFileByName = async (req, res) => {
  const { name } = req.params;
  return res.send(await TaiLieuService.getFileByName(name));
};
module.exports = {
  createTaiLieu,
  uploadFile,
  getTailieuByMaso,
  getTailieuById,
  getFileByName,
};
