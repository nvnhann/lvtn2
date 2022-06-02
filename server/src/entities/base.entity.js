const { Sequelize } = require('sequelize');
class AutoIncrement {
    id = {
        primaryKey: true,
        type: Sequelize.INTEGER
    };
}

class BaseEntity extends AutoIncrement {
    createdBy = { type: Sequelize.STRING(50) };

    createdAt = {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    };

    updatedBy = { type: Sequelize.STRING(50) };

    updatedAt = {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    };;
}

module.exports = { AutoIncrement, BaseEntity }