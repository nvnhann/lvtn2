import React from "react";
import { AiTwotoneFileExcel } from "react-icons/ai";

var arr = [
  {
    id: 1,
    img: "https://i.pinimg.com/564x/f0/19/c4/f019c408f21614452a28fea474074953.jpg",
  },
  {
    id: 2,
    img: "https://i.pinimg.com/564x/97/24/3c/97243cba12cb36d41624e610baf7671e.jpg",
  },
  {
    id: 3,
    img: "https://i.pinimg.com/564x/b0/59/01/b05901126c29226ec588bc63b9e23a4d.jpg",
  },
  {
    id: 4,
    img: "https://i.pinimg.com/564x/54/9e/f5/549ef58a9844f35fe9fb11283411fa91.jpg",
  },
  {
    id: 5,
    img: "https://i.pinimg.com/564x/4c/34/0a/4c340a3d5db6a11fbfa7166926c67273.jpg",
  },
  {
    id: 6,
    img: "https://i.pinimg.com/564x/a5/9c/e3/a59ce3c90ca73a0046949d2d1391aac5.jpg",
  },
];

function Account() {
  return (
    <div>
      <button className="px-4 py-2 my-2 mr-2 bg-slate-400 rounded-md">Thêm tài khoản</button>
      <button className="px-4 py-2 my-2 bg-slate-400 rounded-md inline-flex items-center">Thêm tài khoản <AiTwotoneFileExcel className="ml-2" color="#064e3b" /></button>
      <div className="grid grid-cols-5 gap-4">
        {arr.map(({img}, idx) => (
          <div key={idx} className="relative h-[250px] border rounded-md">
            <img className="mx-auto mt-4 w-[80px] h-[80px] rounded-full" src={img} alt="avatar" />
            <div className="mt-5 text-center">
              <p>Nguyễn Thị Mèo</p>
              <p>MSSV: B180xxxx</p>
            </div>
            <div className="absolute w-full bottom-2 flex justify-center gap-2">
              <button className="px-4 py-1 bg-slate-400 rounded-md">Xem</button>
              <button className="px-4 py-1 bg-slate-400 rounded-md">Sửa</button>
              <button className="px-4 py-1 bg-slate-400 rounded-md">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;
