const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const CTKH = sequelize.define('chi_tiet_kh', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
  }, {underscored: true, tableName: 'chi_tiet_kh'});
  CTKH.associate = function(models) {
    // associations can be defined here
  };
  return CTKH;
};
