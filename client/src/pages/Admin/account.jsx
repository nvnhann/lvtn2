import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const styleAddAccount = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const schema = yup
  .object({
    ten: yup.string().required("Vui lòng nhập tên"),
    mssv: yup.string().required("Vui lòng nhập mã số sinh viên"),
    gioitinh: yup.string().required("Vui lòng chọn giới tính"),
    email: yup.string().required("Vui lòng nhập email"),
    ngaysinh: yup.string().required("Vui lòng chọn ngày sinh"),
    sodienthoai: yup
      .number()
      .positive()
      .integer()
      .max(2, "Số điện thoại gồm 10 chữ số")
      .required("Vui lòng nhập số điện thoại"),
    diachi: yup.string().required("Vui lòng nhập ngày sinh"),
  })
  .required();

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

const defaulValue = {
  ten: "",
  mssv: "",
  gioitinh: "",
  email: "",
  ngaysinh: "",
  sodienthoai: "",
  diachi: "",
};

function Account() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Data form
  const createAccount = (data) => console.log(data);

  return (
    <div>
      <div className="flex gap-4 mb-5">
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-yellow-400 font-bold rounded-md shadow-md"
        >
          Thêm tài khoản
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleAddAccount}>
            <p className="mb-4 text-[25px] font-bold text-center">
              Thêm tài khoản
            </p>
            <form onSubmit={handleSubmit((data) => createAccount(data))}>
              <div className="relative my-5">
                <p className="mb-1 font-bold">Tên</p>
                <input
                  type="text"
                  name="ten"
                  {...register("ten")}
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                />
                <p className="absolute text-[12px] text-red-600">
                  {errors.ten?.message}
                </p>
              </div>
              <div className="relative my-5">
                <p className="mb-1 font-bold">MSSV</p>
                <input
                  type="text"
                  name="mssv"
                  {...register("mssv")}
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                />
                <p className="absolute text-[12px] text-red-600">
                  {errors.mssv?.message}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="mb-1 font-bold">Giới tính</p>
                <input
                  id="nam"
                  name="gioitinh"
                  value="nam"
                  {...register("gioitinh")}
                  type="radio"
                />
                <label htmlFor="nam">Nam</label>
                <input
                  id="nu"
                  name="gioitinh"
                  value="nu"
                  {...register("gioitinh")}
                  type="radio"
                />
                <label htmlFor="nu">Nữ</label>
                <p className="absolute text-[12px] text-red-600">
                  {errors.gioitinh?.message}
                </p>
              </div>
              <div className="relative my-5">
                <p className="mb-1 font-bold">Ngày sinh</p>
                <input
                  type="date"
                  name="ngaysinh"
                  {...register("ngaysinh")}
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                />
                <p className="absolute text-[12px] text-red-600">
                  {errors.ngaysinh?.message}
                </p>
              </div>
              <div className="relative my-5">
                <p className="mb-1 font-bold">Email</p>
                <input
                  type="text"
                  name="email"
                  {...register("email")}
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                />
                <p className="absolute text-[12px] text-red-600">
                  {errors.email?.message}
                </p>
              </div>
              <div className="relative my-5">
                <p className="mb-1 font-bold">Số điện thoại</p>
                <input
                  type="text"
                  name="sodienthoai"
                  {...register("sodienthoai")}
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                />
                <p className="absolute text-[12px] text-red-600">
                  {errors.sodienthoai?.message}
                </p>
              </div>
              <div className="relative my-5">
                <p className="mb-1 font-bold">Địa chỉ</p>
                <input
                  type="text"
                  name="diachi"
                  {...register("diachi")}
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                />
                <p className="absolute text-[12px] text-red-600">
                  {errors.diachi?.message}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleClose}
                  className="py-2 px-4 border-2 border-yellow-400 font-bold rounded-md hover:bg-yellow-100 shadow-md duration-300"
                >
                  Hủy
                </button>
                <button className="py-2 px-4 bg-yellow-400 font-bold rounded-md shadow-md hover:opacity-80 duration-300">
                  Thêm
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {arr.map(({ img }, idx) => (
          <div key={idx} className="relative h-[250px] border rounded-md">
            <img
              className="mx-auto mt-4 w-[80px] h-[80px] rounded-full"
              src={img}
              alt="avatar"
            />
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
