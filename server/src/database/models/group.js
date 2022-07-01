const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
  }, {underscored: true, tableName: 'group'});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};
