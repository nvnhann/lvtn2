'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
  await queryInterface.bulkInsert('khoahoc', [
	{
		"id" : 1,
		"ma_khoa_hoc" : "CT101",
		"ten_khoa_hoc" : "Lập trình căn bản",
		"active" : 1,
		"created_at" : "2022-07-02 09:27:52",
		"updated_at" : "2022-07-02 09:27:52"
	},
	{
		"id" : 2,
		"ma_khoa_hoc" : "CT103",
		"ten_khoa_hoc" : "Cấu trúc dữ liệu",
		"active" : 1,
		"created_at" : "2022-07-02 09:27:52",
		"updated_at" : "2022-07-02 09:27:52"
	},
	{
		"id" : 3,
		"ma_khoa_hoc" : "CT175",
		"ten_khoa_hoc" : "Lý thuyết đồ thị",
		"active" : 1,
		"created_at" : "2022-07-02 09:27:52",
		"updated_at" : "2022-07-02 09:27:52"
	},
	{
		"id" : 4,
		"ma_khoa_hoc" : "CT178",
		"ten_khoa_hoc" : "Nguyên lý hệ điều hành",
		"active" : 1,
		"created_at" : "2022-07-02 09:27:52",
		"updated_at" : "2022-07-02 09:27:52"
	}
]
, {});
  
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('khoahoc', null, {});
    
  }
};
