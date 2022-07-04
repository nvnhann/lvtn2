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

db.User.hasOne(db.Avatar);
db.User.belongsTo(db.BoMon);
db.User.belongsToMany(db.KhoaHoc, { through: "chi_tiet_kh" });
db.User.belongsToMany(db.Group, { through: "membership" });
db.User.belongsToMany(db.TaiLieu, { through: "ct_tai_lieu" });

db.LinhVuc.belongsToMany(db.TaiLieu, { through: "ct_lv" });

db.TaiLieu.belongsToMany(db.LinhVuc, { through: "ct_lv" });
db.TaiLieu.belongsToMany(db.User, { through: "ct_tai_lieu" });

db.BoMon.hasMany(db.User);

db.KhoaHoc.belongsToMany(db.User, { through: "chi_tiet_kh" });

db.Avatar.belongsTo(db.User);

db.Group.belongsToMany(db.User, { through: "membership" });

sequelize.sync();
module.exports = db;
