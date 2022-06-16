import React from "react";

var arr = [
  {
    idsv: 1,
    matkhausv: "12345",
    tensv: "Trần Mèo Anh",
    gioitinhsv: "1",
    diachisv: "Hung Loi, Ninh Kieu, Can Tho",
    mailsv: "khoab1809248@student.ctu.edu.vn",
    sdtsv: "0398423952",
    ngaysinhsv: "10/08/2000",
    nienkhoasv: "2018-2022",
    hinhsv: "https://i.pinimg.com/564x/b0/59/01/b05901126c29226ec588bc63b9e23a4d.jpg",
  },
  {
    idsv: 2,
    matkhausv: "12345",
    tensv: "Nguyễn Mèo Em",
    gioitinhsv: "1",
    diachisv: "Hung Loi, Ninh Kieu, Can Tho",
    mailsv: "khoab1809248@student.ctu.edu.vn",
    sdtsv: "0398423952",
    ngaysinhsv: "10/08/2000",
    nienkhoasv: "2018-2022",
    hinhsv: "https://i.pinimg.com/564x/b0/59/01/b05901126c29226ec588bc63b9e23a4d.jpg",
  },
  {
    idsv: 3,
    matkhausv: "12345",
    tensv: "Lê Thị Mèo Em Họ",
    gioitinhsv: "1",
    diachisv: "Hung Loi, Ninh Kieu, Can Tho",
    mailsv: "khoab1809248@student.ctu.edu.vn",
    sdtsv: "0398423952",
    ngaysinhsv: "10/08/2000",
    nienkhoasv: "2018-2022",
    hinhsv: "https://i.pinimg.com/564x/b0/59/01/b05901126c29226ec588bc63b9e23a4d.jpg",
  },
];

function Student() {
  return (
    <div>
      <div className="mb-4">
        <button className="px-4 py-2 bg-slate-400 rounded-md">Thêm sinh viên</button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {arr.map(({tensv, mailsv, nienkhoasv, hinhsv}, idx) => (
          <div key={idx} className="relative h-[250px] border rounded-md">
            <img className="mx-auto mt-4 w-[80px] h-[80px] rounded-full" src={hinhsv} alt="avatar" />
            <div className="mt-5 text-center">
              <p>{tensv}</p>
              <p>{mailsv}</p>
              <p>{nienkhoasv}</p>
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

export default Student;
