const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    maso: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mat_khau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ho_ten: {
      type: DataTypes.STRING,
    },
    sdt: {
      type: DataTypes.STRING,
    },
    dia_chi: {
      type: DataTypes.STRING,
    },
    ngay_sinh:{
      type: DataTypes.DATE
    },
    gioi_tinh: {
      type: DataTypes.BOOLEAN
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
  }, {underscored: true, tableName: 'user'});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
