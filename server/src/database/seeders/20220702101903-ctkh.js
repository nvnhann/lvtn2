'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     
      await queryInterface.bulkInsert('chi_tiet_kh', [
        {
          "created_at" : "2022-07-02 09:30:01",
          "updated_at" : "2022-07-02 09:30:01",
          "user_id" : 11,
          "khoahoc_id" : 1
        },
        {
          "created_at" : "2022-07-02 09:32:39",
          "updated_at" : "2022-07-02 09:32:39",
          "user_id" : 11,
          "khoahoc_id" : 2
        },
        {
          "created_at" : "2022-07-02 09:32:39",
          "updated_at" : "2022-07-02 09:32:39",
          "user_id" : 11,
          "khoahoc_id" : 3
        },
        {
          "created_at" : "2022-07-02 09:32:39",
          "updated_at" : "2022-07-02 09:32:39",
          "user_id" : 11,
          "khoahoc_id" : 4
        },
        {
          "created_at" : "2022-07-02 09:32:39",
          "updated_at" : "2022-07-02 09:32:39",
          "user_id" : 12,
          "khoahoc_id" : 2
        },
        {
          "created_at" : "2022-07-02 09:32:39",
          "updated_at" : "2022-07-02 09:32:39",
          "user_id" : 12,
          "khoahoc_id" : 3
        },
        {
          "created_at" : "2022-07-02 09:32:39",
          "updated_at" : "2022-07-02 09:32:39",
          "user_id" : 12,
          "khoahoc_id" : 4
        },
        {
          "created_at" : "2022-07-02 09:46:13",
          "updated_at" : "2022-07-02 09:46:13",
          "user_id" : 20,
          "khoahoc_id" : 1
        }
      ]
      , {});
    
  },

  async down (queryInterface, Sequelize) {
         
      await queryInterface.bulkDelete('chi_tiet_kh', null, {});
     
  }
};
