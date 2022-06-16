import React, {useState} from "react";
import {FaUserCircle} from "react-icons/fa";
import {BiSearch} from "react-icons/bi";

import {Link, Route, Routes} from "react-router-dom";
import Document from "./document";
import Course from "./course";
import Teacher from "./teacher";
import TeacherProfile from "./teacher_profile";
import MyProfile from "./my_profile";

function Student() {
  const [show, setShow] = useState(false);

  const handleProfile = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="flex justify-between items-center py-5 px-6 bg-[#2554A6] text-white">
        <p className="block w-[15%] text-[30px] font-bold">CIT</p>
        <div className="flex justify-center w-[70%]">
          <input className="py-2 px-4 w-[80%] rounded-l-md" type="text" />
          <button className="px-4 py-2 bg-white rounded-r-md border border-r">
            <BiSearch size={20} color="#000" />
          </button>
        </div>
        <div className="flex gap-4 justify-end items-center w-[15%]">
          <p>Nguyen Van A</p>
          <div className="relative">
            <FaUserCircle className="cursor-pointer" size={25} onClick={handleProfile} />
            {show === true ? (
              <div className="absolute -right-3 w-[200px] text-center top-[40px] p-3 bg-white rounded-md after:content-['*'] after:w-[25px] after:h-[25px] after:absolute after:top-[-12px] after:right-[10px] after:bg-white after:rotate-45">
                <Link to="/student/my_profile">
                  <p className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300">
                    Trang cá nhân
                  </p>
                </Link>
                <p className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300">
                  Đăng xuất
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-[20%] p-5">
          <div className="bg-[#7184c6] p-4 rounded-md text-center">
            <Link to="/student/course">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">Các khóa học</p>
            </Link>
            <Link to="/student/teacher">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">Giảng viên</p>
            </Link>
            <Link to="/student/document">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                Tài liệu của tôi
              </p>
            </Link>
          </div>
        </div>
        <div className="w-[80%] p-5">
          <Routes>
            <Route path="/document" element={<Document />} />
            <Route path="/course" element={<Course />} />
            <Route path="/teacher/*" element={<Teacher />} />
            <Route path="/teacher/teacher_profile" element={<TeacherProfile />} />
            <Route path="/my_profile" element={<MyProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Student;
