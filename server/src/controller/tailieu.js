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
  try {
    return res.status(200).json(await TaiLieuService.getTailieuByMaso(req.params.maso, req.query.search));
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

const deleteTaiLieuById = async (req, res) => {
  try{
    await TaiLieuService.deleteTaiLieuById(req.params.id);
    res.status(200).json({message: 'Thành công'});
  }catch (e) {
    console.log(e);
    res.status(500).json({message: e})
  }
}
const setActiveTaiLieu = async (req, res) => {
  try{
    await TaiLieuService.setActiveTaiLieu(req.body.id, req.body.active);
    res.status(200).json({message: 'Thành công'})
  }  catch (e) {
    console.log(e);
    res.status(200).json({message: e})
  }
}

const saveTaiLieu = async (req, res) => {
  try {
    const {id, idtl} = req.body;
     await TaiLieuService.saveTaiLieu(id, idtl)
    res.status(200).json({message: 'Thành công'})
  }catch (e){
    console.log(e);
    res.status(500).json({message: e})
  }
}

const unSaveTaiLieu = async (req, res) => {
  try {
    const {id, idtl} = req.body;
    await TaiLieuService.unSaveTaiLieu(id, idtl)
    res.status(200).json({message: 'Thành công'})
  }catch (e){
    console.log(e);
    res.status(500).json({message: e})
  }
}

const getTaiLieuSave = async (req, res) =>{
  try{
    res.status(200).json(await TaiLieuService.getTaiLieuSave(req.user.maso));
  }catch (e) {
    console.log(e);
    res.status(400).json({message: e})
  }
}

const getTaiLieuByLinhVuc = async (req, res) =>{
  try{
    res.status(200).json(await TaiLieuService.getTaiLieuByLinhVuc(req.params.linhvuc));
  }catch (e) {
    console.log(e);
    res.status(400).json({message: e})
  }
}

const getGoiY = async (req, res) => {
  try{
    res.status(200).json(await TaiLieuService.getGoiY(req.params.id));
  }catch (e) {
    console.log(e);
    res.status(400).json({message: e})
  }
}
module.exports = {
  createTaiLieu,
  uploadFile,
  getTailieuByMaso,
  getTailieuById,
  getFileByName,
  deleteTaiLieuById,
  setActiveTaiLieu,
  saveTaiLieu,
  getGoiY,
  getTaiLieuSave,
  getTaiLieuByLinhVuc,
  unSaveTaiLieu
};
