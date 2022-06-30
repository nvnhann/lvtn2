import React from "react";
import {MdDelete} from "react-icons/md";
import {Link} from "react-router-dom";

const arr_2 = [
  {
    id: 1,
    tenbaibao: "Xây dựng website Bán đồ hàng",
    tengv: "Nguyễn Trần Thị Ngọc Lê Thi",
  },
  {
    id: 2,
    tenbaibao: "Xây dựng website Bán đồ hàng",
    tengv: "Nguyễn Trần Thị Ngọc Lê Thi",
  },
  {
    id: 3,
    tenbaibao: "Xây dựng website Bán đồ hàng",
    tengv: "Nguyễn Trần Thị Ngọc Lê Thi",
  },
  {
    id: 4,
    tenbaibao: "Xây dựng website Bán đồ hàng",
    tengv: "Nguyễn Trần Thị Ngọc Lê Thi",
  },
  {
    id: 5,
    tenbaibao: "Xây dựng website Bán đồ hàng",
    tengv: "Nguyễn Trần Thị Ngọc Lê Thi",
  },
];

function Article() {
  return (
    <div className="w-full px-5 grid grid-cols-4 gap-4">
      {arr_2?.map((item, idx) => (
        <Link key={idx} to={`/student/article=${item.id}`}>
          <div className="bg-white p-3 rounded-md">
            <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden">
              {/* <GoogleDocsViewer width="100%" height="160px" fileUrl={lvtn} /> */}
            </div>
            <p>
              <strong>{item.tenbaibao}</strong>
            </p>
            <span>
              tạo bởi <strong>{item.tengv}</strong>
            </span>
            <p>
              <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">Máy học</span>
              <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">ML</span>
            </p>

            <MdDelete size={30} color="#757575" className="ml-auto mr-0 cursor-pointer" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Article;
