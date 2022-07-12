const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const KhoaHoc = sequelize.define('khoahoc', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ma_khoa_hoc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ten_khoa_hoc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
  }, {underscored: true, tableName: 'khoahoc'});
  KhoaHoc.associate = function(models) {
    // associations can be defined here
  };
  return KhoaHoc;
};
