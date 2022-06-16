import React from "react";
import {MdDelete} from "react-icons/md";
import GoogleDocsViewer from "react-google-docs-viewer";
import lvtn from ".././../assets/files/lvtn.docx";

function TeacherProfile() {
  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="w-[150px] h-[150px] bg-slate-200 rounded-md"></div>
        <div>
          <p className="text-[25px] font-bold uppercase">Phạm Thế Phi</p>
          <p>Giới tính:</p>
          <p>Email:</p>
          <p>Đơn vị công tác:</p>
          <p>Học vị:</p>
        </div>
      </div>

      <div className="mt-5 rounded-md">
        <p className="text-[18px] font-medium">Học phần giảng dạy</p>
        <div className="grid grid-cols-3 gap-2 mt-5 p-2 bg-slate-200">
          <p className="bg-white p-2 rounded-md">CT178-Nguyên lý hệ điều hành</p>
          <p className="bg-white p-2 rounded-md">CT178-Nguyên lý hệ điều hành</p>
          <p className="bg-white p-2 rounded-md">CT178-Nguyên lý hệ điều hành</p>
          <p className="bg-white p-2 rounded-md">CT178-Nguyên lý hệ điều hành</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[18px] font-medium">Tài liệu</p>
        <div className=" grid grid-cols-4 gap-2 mt-5 w-full">
          <div className="bg-white p-3 rounded-md">
            <div className="mb-4 rounded-lg overflow-hidden">
              <GoogleDocsViewer width="100%" height="160px" fileUrl={lvtn} />
            </div>
            <p>
              <strong>Giải thuật cây quyết định</strong>
            </p>
            <span>
              tạo bởi <strong>Trần Nguyễn Minh Thư</strong>
            </span>
            <p>
              <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">Máy học</span>
              <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">ML</span>
            </p>
            <MdDelete size={30} color="#757575" className="ml-auto mr-0 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[18px] font-medium">Nghiên cứu khoa học</p>
      </div>
    </div>
  );
}

export default TeacherProfile;
