require('dotenv').config();
const { Sequelize } = require('sequelize');

class BaseRepository {
    sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD,
        {
            dialect: 'mysql', host: process.env.MYSQL_HOST, port: process.env.MYSQL_PORT,
            define: {
                // timestamps: true,
                freezeTableName: true,
            },
        });
    repos;
    constructor(entity) {
        this.repos = this.sequelize.define(entity.constructor.name, { ...entity });
    }

    getAll = async () => {
        console.log(`==================== ${this.constructor.name}, call method GetAll ====================`);
        return await this.repos.findAll({returning: true});
    }

    getById = async (id) => {
        console.log(`==================== ${this.constructor.name}, call method GetById ====================`);
        return await this.repos.findByPk(id).then(t => t);
    }

    create = async (entity) => {
        console.log(`==================== ${this.constructor.name}, call method Create ====================`);
            return await this.repos.create(entity,{ returning: true});
      
    }

    update = async (entity) => {
        console.log(`==================== ${this.constructor.name}, call method Update ====================`);
        return await this.repos.update(entity, {where: { id: entity.id}, returning: true});
    }

    delete = async (id) => {
        console.log(`==================== ${this.constructor.name}, call method Delete ====================`);
        return await this.repos.destroy({where:{id:id}})
    }
}
module.exports = { BaseRepository }