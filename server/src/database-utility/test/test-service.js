var expect = require('chai').expect;
var assert = require('assert');

const Sequelize = require('sequelize');
const sequelize = require('../config').sequelize();
const common = require('../utils');

const Op = Sequelize.Op;
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});

sequelize.sync();

describe('Test utils', function () {

    it('Save', function (done) {

        common.save(User, {
            firstName: 'John',
            lastName: 'Hancock'
        }).then(user => {
            expect('John').to.equal(user.get('firstName'));
            done();
        });
    });

    it('Delete', function (done) {
        common.delete(User, {where: {id: 5}}).then(() => done());
    });

    it('Find', function (done) {
        common.findByPk(User, 2).then(user => {
            if(user) {
                expect('John').to.equal(user.get('firstName'));
            }
            done();
        });
    });

    it('Bulk save', function (done) {
        common.bulkSave(User, 
            [{firstName: 'John', lastName: 'Hancock'},{firstName: 'John2', lastName: 'Hancock2'},
             {firstName: 'John', lastName: 'Hancock'},{firstName: 'John2', lastName: 'Hancock2'}])
        .then(result => {
            expect(4).to.equal(result.length);
            done();
        });
    });

    it('Sum', function (done) {
        common.sum(User, 'id', { where: { id: { [Op.lt]: 5 } } }).then(sum => {
            expect(10).to.equal(sum);
            done();
        });
    });

    it('min', function (done) {
        common.min(User, 'id').then(min => {
            expect(1).to.equal(min);
            done();
        });
    });

});
