import React from "react";
import {GrDocumentText} from "react-icons/gr";
import {AiFillCaretDown} from "react-icons/ai";

const arr = [
  {id: 1, tengv: "Đào Minh Minh"},
  {id: 2, tengv: "Đào Đào Minh"},
  {id: 3, tengv: "Đào Minh Khoa"},
  {id: 4, tengv: "Đào Đào Khoa"},
];

function Home() {
  const viewTeacher = (idgv) => {
    console.log(idgv);
  };
  return (
    <div className="p-5 bg-[#2554A6]">
      <p className="uppercase text-center text-[25px] text-white">có thể bạn quan tâm</p>
      <div className="mt-5 flex justify-between gap-8 text-center ">
        <p className="py-2 w-full bg-[#F5F5F5] cursor-pointer rounded-md">Tất cả</p>
        <p className="py-2 w-full bg-[#F5F5F5] cursor-pointer rounded-md">Giảng viên</p>
        <p className="py-2 w-full bg-[#F5F5F5] cursor-pointer rounded-md">Bài báo</p>
        <p className="py-2 w-full bg-[#F5F5F5] cursor-pointer rounded-md">Khóa học</p>
      </div>

      <div className="p-4 mt-5 bg-[#D9D9D9]">
        {arr?.map(({id, tengv}, idx) => (
          <div key={idx} className="p-4 mb-5 flex justify-between rounded-md bg-white">
            <p>
              <strong>Giảng viên: </strong>
              {tengv}
            </p>

            <div onClick={() => viewTeacher(id)} className="flex items-center cursor-pointer">
              <GrDocumentText />
              <p>Xem</p>
            </div>
          </div>
        ))}
        <p className="mt-5 flex items-center justify-center cursor-pointer">
          <strong>Xem thêm </strong> <AiFillCaretDown />
        </p>
      </div>
    </div>
  );
}

export default Home;
