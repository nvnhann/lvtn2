const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TaiLieu = sequelize.define('tailieu', {
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
    mota: {
      type: DataTypes.STRING,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    }
  }, {underscored: true, tableName: 'tailieu'});
  TaiLieu.associate = function(models) {
    // associations can be defined here
  };
  return TaiLieu;
};
