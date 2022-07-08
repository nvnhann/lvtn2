"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
let { sequelize } = require("../../database-utility");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

if (env === "development") {
  sequelize = new Sequelize(config.url, config);
}

db.sequelize = sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Group = require("./group")(sequelize, Sequelize);
db.Avatar = require("./avatar")(sequelize, Sequelize);
db.BoMon = require("./bomon")(sequelize, Sequelize);
db.KhoaHoc = require("./khoahoc")(sequelize, Sequelize);
db.TaiLieu = require("./tailieu")(sequelize, Sequelize);
db.LinhVuc = require("./linhvuc")(sequelize, Sequelize);
db.CTKH = require('./chitietkhoahoc')(sequelize, Sequelize);
db.BaiViet = require('./baiviet')(sequelize, Sequelize);

db.User.hasOne(db.Avatar);
db.User.belongsTo(db.BoMon);
db.User.belongsToMany(db.KhoaHoc, { through: db.CTKH });
db.User.belongsToMany(db.Group, { through: "membership" });
db.User.hasMany(db.TaiLieu);
db.User.belongsToMany(db.CTKH, {through:"tv_kh" });

db.LinhVuc.belongsToMany(db.TaiLieu, { through: "ct_lv" });
db.User.belongsToMany(db.TaiLieu, { through: "tl_luu" });

db.TaiLieu.belongsToMany(db.LinhVuc, { through: "ct_lv" });
db.TaiLieu.belongsTo(db.User);
db.TaiLieu.belongsToMany(db.User, { through: "tl_luu" });


db.BoMon.hasMany(db.User);

db.KhoaHoc.belongsToMany(db.User, { through: db.CTKH });
db.CTKH.belongsToMany(db.User, {through:"tv_kh" });
db.CTKH.hasMany(db.BaiViet);

db.BaiViet.belongsTo(db.CTKH);

db.BaiViet.belongsToMany(db.TaiLieu, {through:"ct_bv" });
db.TaiLieu.belongsToMany(db.BaiViet,{through:"ct_bv" } );

db.Avatar.belongsTo(db.User);

db.Group.belongsToMany(db.User, { through: "membership" });

sequelize.sync();
module.exports = db;
