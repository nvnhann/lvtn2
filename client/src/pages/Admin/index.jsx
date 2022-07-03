import "../../assets/css/styles.css";
import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

import Account from "./account";
import Student from "./student";
import Lecturer from "./lecturers";
import Course from "./courses";
import BoMon from "./bomon";

function Admin() {
  return (
    <div className="flex text-slate-900">
      <div className=" w-[20%] h-[100vh]">
        <div className="w-full h-full rounded-md border-r border-slate-200">
          <div className="flex justify-center items-center h-[150px]">
            <p className="text-[30px] font-bold">ADMIN</p>
          </div>
          <div>
            <Link to="/admin/students">
              <div className="flex gap-5 items-center w-[90%] mx-auto my-2 px-5 py-3 hover:bg-[#42C2FF] hover:text-white rounded-md duration-300 cursor-pointer">
                <AiOutlineUser size={25} />
                <p className="">Sinh Viên</p>
              </div>
            </Link>
            <Link to="/admin/lecturers">
              <div className="flex gap-5 items-center w-[90%] mx-auto my-2 px-5 py-3 hover:bg-[#42C2FF] hover:text-white rounded-md duration-300 cursor-pointer">
                <AiOutlineUser size={25} />
                <p className="">Giảng Viên</p>
              </div>
            </Link>
            <Link to="/admin/bomon">
              <div className="flex gap-5 items-center w-[90%] mx-auto my-2 px-5 py-3 hover:bg-[#42C2FF] hover:text-white rounded-md duration-300 cursor-pointer">
                <BsNewspaper size={25} />
                <p className="">Bộ môn</p>
              </div>
            </Link>
            <Link to="/admin/accounts">
              <div className="flex gap-5 items-center w-[90%] mx-auto my-2 px-5 py-3 hover:bg-[#42C2FF] hover:text-white rounded-md duration-300 cursor-pointer">
                <FiUsers size={25} />
                <p className="">Tài khoản</p>
              </div>
            </Link>
            <Link to="/admin/courses">
              <div className="flex gap-5 items-center w-[90%] mx-auto my-2 px-5 py-3 hover:bg-[#42C2FF] hover:text-white rounded-md duration-300 cursor-pointer">
                <BsNewspaper size={25} />
                <p className="">Khóa học</p>
              </div>
            </Link>
            <Link to="/admin/posts">
              <div className="flex gap-5 items-center w-[90%] mx-auto my-2 px-5 py-3 hover:bg-[#42C2FF] hover:text-white rounded-md duration-300 cursor-pointer">
                <BsNewspaper size={25} />
                <p className="">Bài báo</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 p-4 w-full h-[100px] border-b border-slate-200">
          <div></div>

          <div>
            <button className="ml-2 px-4 py-2 font-medium bg-yellow-400 rounded-md">
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/account" />} />
            <Route path="/accounts" element={<Account />} />
            <Route path="/students" element={<Student />} />
            <Route path="/lecturers" element={<Lecturer />} />
            <Route path="/posts" element={<Lecturer />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/bomon" element={<BoMon />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
