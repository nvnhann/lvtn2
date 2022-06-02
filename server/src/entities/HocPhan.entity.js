const { BaseEntity } = require('./base.entity');
const { Sequelize } = require('sequelize');

class HocPhan extends BaseEntity {
    mahp = { 
        type: Sequelize.STRING(50),
        allowNull: false
    };
    tenhp = { 
        type: Sequelize.STRING(255),
        allowNull: false
    };
}

module.exports = { HocPhan }