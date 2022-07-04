'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('linhvuc',[
        {"id":"1","name":"Luận văn tốt nghiệp","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"2","name":"Niên luận","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"3","name":"Tiểu luận","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"4","name":"Tài liệu học tập","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"5","name":"Tài liệu giảng dạy","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"6","name":"Máy học","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"7","name":"Cơ sở dữ liệu","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"8","name":"Dữ liệu lớn","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"9","name":"Mã nguồn mở","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"10","name":"Trí tuệ nhân tạo","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"11","name":"Nghiên cứu khoa học","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"},
        {"id":"12","name":"Khác","created_at":"2022-07-03 16:11:32","updated_at":"2022-07-03 16:11:32"}
        ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('linhvuc', null, {});
     
  }
};
