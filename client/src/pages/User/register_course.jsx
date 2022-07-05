import React from "react";

function RegisterCourse() {
  return (
    <div className="flex justify-center items-center mx-auto h-[400px] bg-white rounded-md p-2">
      <div className="text-center leading-10">
        <p className="text-[30px] font-bold">Khóa học: Lập trình căn bản</p>
        <p>Giảng viên: Nguyễn Minh Trung</p>
        <button className="mt-4 py-2 px-4 bg-[#2554A6] text-white rounded-md font-medium shadow-md hover:opacity-90 duration-300">
          Ghi danh khóa học
        </button>
      </div>
    </div>
  );
}

export default RegisterCourse;
