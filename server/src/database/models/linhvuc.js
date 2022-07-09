const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const LinhVuc = sequelize.define('linhvuc', {
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
  }, {underscored: true, tableName: 'linhvuc'});
  LinhVuc.associate = function(models) {
    // associations can be defined here
  };
  return LinhVuc;
};
