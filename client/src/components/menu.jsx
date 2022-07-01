import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div>
        <div className="flex mt-4">
        <div className="w-[20%] p-5">
          <div className="bg-[#47568A] p-4 rounded-md text-center">
            <Link to="/student/home">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                Gợi ý cho bạn
              </p>
            </Link>
            <Link to="/student/course">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                Các khóa học
              </p>
            </Link>
            <Link to="/student/teacher">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                Giảng viên
              </p>
            </Link>
            <Link to="/student/document">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                Tài liệu của tôi
              </p>
            </Link>
            <Link to="/student/article">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                Bài báo
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;