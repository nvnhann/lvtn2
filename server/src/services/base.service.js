const { ResponseDto } = require('../dtos/response.dto');

class BaseService {
    _repos;
    constructor(repos) {
        this._repos = repos;
    }

    getAll = async () => {
       console.log(`==================== ${this.constructor.name}, call method GetAll ====================`);
        let responseDto = new ResponseDto();
        responseDto.results = await this._repos.getAll();
        return responseDto;
    }

    getById = async (id) => {
       console.log(`==================== ${this.constructor.name}, call method GetById ====================`);
        let responseDto = new ResponseDto();
        responseDto.results = await this._repos.getById(id);
        return responseDto;
    }

    create = async (entity) => {
       console.log(`==================== ${this.constructor.name}, call method Create ====================`);
        let responseDto = new ResponseDto();
        try {
            responseDto.results = await this._repos.create(entity);
        } catch (error) {
            responseDto.errorCode = 500
            let val = '';
            error.errors.map(er=>{
                val = er.value;
            })        
            if(error.name === 'SequelizeUniqueConstraintError') responseDto.results = {message: `${val} Da ton tai`}
        }

        return responseDto;
    }

    update = async (id, entity) => {
       console.log(`==================== ${this.constructor.name}, call method Update ====================`);
        entity.id = id;
        let responseDto = new ResponseDto();
        console.log(entity)
        responseDto.results = await this._repos.update(entity);
        return responseDto;
    }

    delete = async (id) => {
       console.log(`==================== ${this.constructor.name}, call method Delete ====================`);
        let responseDto = new ResponseDto();
        responseDto.results = await this._repos.delete(id);
        return responseDto;
    }
}
module.exports = { BaseService }