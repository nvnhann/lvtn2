const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Avatar = sequelize.define('avatar', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    path_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {underscored: true, tableName: 'avatar'});
  Avatar.associate = function(models) {
    // associations can be defined here
  };
  return Avatar;
};
