const {BaseService} = require('./base.service');
const { HocPhanRepository } = require('../repositories/HocPhan.repository')

class HocphanService extends BaseService {
    _hocphanRepos;
    constructor(){
        let hocphanRepos = new HocPhanRepository();
        super(hocphanRepos);
        this._hocphanRepos = hocphanRepos;
        console.log(`==================== constructor ${this.constructor.name}====================`);
    }
}

module.exports = { HocphanService }