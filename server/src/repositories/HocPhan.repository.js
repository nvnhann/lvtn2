const {BaseRepository} = require('./base.repository');
const { HocPhan } = require('../entities/HocPhan.entity');

class HocPhanRepository extends BaseRepository {
    _hocphan;
    constructor(){
        let hocphan = new HocPhan();
        super(hocphan);
        this._hocphan = hocphan;
        console.log(`==================== constructor ${this.constructor.name}====================`);
    }
}

module.exports = { HocPhanRepository }