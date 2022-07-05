import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiTwotoneFileExcel, AiOutlineSearch } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

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
    bomon: yup.string().required("Vui lòng chọn bộ môn"),
    mssv: yup.string().required("Vui lòng nhập mã số sinh viên"),
    gioitinh: yup.string().nullable().required("Vui lòng chọn giới tính"),
    email: yup
      .string()
      .email("Vui lòng nhập email")
      .required("Vui lòng nhập email"),
  })
  .required();

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
  const handleClose = () => {
    reset(defaulValue);
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm();

  //Data form
  const createAccount = (data) => console.log(data);

  const editAccount = (id) => {
    console.log(id);
  };

  const hiddenAccount = (id) => {
    console.log(id);
  };

  //table
  const columns = [
    {
      field: "hanhdong",
      headerName: "Hành động",
      headerAlign: "center",
      width: 200,
      renderCell: () => (
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={() => editAccount()}
            className="p-2 font-medium min-w-[75px] bg-blue-500 text-white rounded-md shadow-md hover:opacity-90 active:opacity-50 duration-300"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => hiddenAccount()}
            className="p-2 font-medium min-w-[75px] bg-red-500 text-white rounded-md shadow-md hover:opacity-90 active:opacity-50 duration-300"
          >
            Ẩn
          </button>
        </div>
      ),
    },
    { field: "maso", headerName: "Mã số", headerAlign: "center", width: 150 },
    {
      field: "hoten",
      headerName: "Họ tên",
      headerAlign: "center",
      width: 250,
    },
    {
      field: "sodienthoai",
      headerName: "Số điện thoại",
      headerAlign: "center",
      width: 150,
    },
    { field: "mssv", headerName: "MSSV", headerAlign: "center", width: 130 },

    {
      field: "diachi",
      headerName: "Địa chỉ",
      width: 300,
      headerAlign: "center",
    },
  ];

  const rows = [
    { id: 1, maso: "DMK", hoten: "Dao Minh Khoa" },
    { id: 2, maso: "DMK", hoten: "Dao Minh Khoa" },
  ];

  const search = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex gap-4 mb-5">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleOpen}
            className="px-4 py-2 my-2 bg-yellow-400 font-medium rounded-md hover:opacity-90 active:opacity-50 duration-300"
          >
            Thêm tài khoản
          </button>
          <button className="px-4 py-2 my-2 bg-yellow-400 font-medium rounded-md inline-flex items-center hover:opacity-90 active:opacity-50 duration-300">
            Thêm tài khoản
            <AiTwotoneFileExcel className="ml-2" color="#064e3b" />
          </button>
          <form onSubmit={handleSubmitSearch((data) => search(data))}>
            <div className="flex items-center gap-2">
              <input
                name="search"
                {...registerSearch("search")}
                className="w-[500px] py-2 px-2 border border-[#ccc] rounded-md outline-none"
                type="text"
              />
              <button className=" bg-blue-500 rounded-md p-2">
                <AiOutlineSearch size={25} color="#fff" />
              </button>
            </div>
          </form>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleAddAccount}>
            <form onSubmit={handleSubmit((data) => createAccount(data))}>
              <div className="relative my-2">
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
                <p className="mb-1 font-bold">Bộ môn</p>
                <select
                  className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                  name="bomon"
                  {...register("bomon")}
                >
                  <option value="">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                <p className="absolute text-[12px] text-red-600">
                  {errors.bomon?.message}
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
              <div className="relative flex gap-2 items-center">
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
                <p className="absolute -bottom-4 text-[12px] text-red-600">
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

      <div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
