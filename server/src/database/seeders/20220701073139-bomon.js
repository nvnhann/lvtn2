'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.bulkInsert('bomon', [
      {"id":"1","name":"Công nghệ thông tin","created_at":"2022-07-01 09:26:48","updated_at":"2022-07-01 09:26:48", "active":1},
      {"id":"2","name":"Hệ thống thông tin","created_at":"2022-07-01 09:26:48","updated_at":"2022-07-01 09:26:48", "active":1},
      {"id":"3","name":"Khoa học máy tính","created_at":"2022-07-01 09:26:48","updated_at":"2022-07-01 09:26:48", "active":1},
      {"id":"4","name":"Kỹ thuật phần mềm","created_at":"2022-07-01 09:26:48","updated_at":"2022-07-01 09:26:48", "active":1},
      {"id":"5","name":"Tin học ứng dụng","created_at":"2022-07-01 09:26:48","updated_at":"2022-07-01 09:26:48", "active":1},
      {"id":"6","name":"Mạng máy tính và truyền thông dữ liệu","created_at":"2022-07-01 09:26:48","updated_at":"2022-07-01 09:26:48", "active":1}
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('bomon', null, {});
  }
};
