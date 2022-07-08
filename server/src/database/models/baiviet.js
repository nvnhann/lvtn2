const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const BaiViet = sequelize.define('baiviet', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        noidung: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    }, {underscored: true, tableName: 'baiviet'});
    BaiViet.associate = function(models) {
        // associations can be defined here
    };
    return BaiViet;
};
