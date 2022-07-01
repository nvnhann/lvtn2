'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
      await queryInterface.bulkInsert('group', [{
     nae: 'John Doe',
     isBetaMember: false
     }], {});
    */
     await queryInterface.bulkInsert('group', [
      {"id":"1","groupname":"SINHVIEN","active":"1","created_at":"2022-07-01 09:43:41","updated_at":"2022-07-01 09:43:41"},
      {"id":"2","groupname":"GIANGVIEN","active":"1","created_at":"2022-07-01 09:43:41","updated_at":"2022-07-01 09:43:41"},
      {"id":"3","groupname":"ADMIN","active":"1","created_at":"2022-07-01 09:43:41","updated_at":"2022-07-01 09:43:41"},
      {"id":"4","groupname":"NGHIENCUUSINH","active":"1","created_at":"2022-07-01 09:43:41","updated_at":"2022-07-01 09:43:41"}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('group', null, {});

  }
};
