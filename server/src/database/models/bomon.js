const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BoMon = sequelize.define('bomon', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {underscored: true, tableName: 'bomon'});
  BoMon.associate = function(models) {
    // associations can be defined here
  };
  return BoMon;
};
