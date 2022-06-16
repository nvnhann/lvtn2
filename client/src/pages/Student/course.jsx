import React from "react";
import {CgPlayListRemove} from "react-icons/cg";

function Course() {
  return (
    <div>
      <div className="flex justify-between p-4 bg-white rounded-md">
        <div>
          <p>
            <strong>CT428-Lập Trình Web</strong>
          </p>
          <p>
            <strong>Giảng viên:</strong> Nguyễn Minh Trung
          </p>
        </div>
        <div className="flex items-center">
          <CgPlayListRemove size={30} />
          <p>Thoát khỏi khóa học</p>
        </div>
      </div>
    </div>
  );
}

export default Course;
