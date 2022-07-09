import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiTwotoneFileExcel, AiOutlineSearch } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { getData, postData } from "../../utils/httpProvider";
import { API_BASE_URL } from "../../config/configUrl";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TablePagination,
  Button,
  TableBody,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useSnackbar } from "notistack";

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

const styleEditAccount = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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
};

function Account() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const [page, setPage] = useState(0);
  const [bomon, setBoMon] = useState([]);
  const [searchDt, setSearchDt] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [load, setLoad] = useState(0);
  const [openEditAccount, setOpenEditAccount] = useState(false);

  const handleOpenEditAccount = () => setOpenEditAccount(true);
  const handleCloseEditAccount = () => setOpenEditAccount(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    reset(defaulValue);
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      let res = [];
      if (!searchDt) res = await getData(API_BASE_URL + "/user");
      else res = await getData(API_BASE_URL + "/user?search=" + searchDt);
      setData(res.data);
      const bm = await getData(API_BASE_URL + "/bomon");
      setBoMon(bm.data);
    })();
  }, [load, searchDt]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm();

  const { register: registerEdit, handleSubmit: handleSubmitEdit } = useForm();

  //Data form
  const createAccount = async (data) => {
    try {
      let usr = {};
      usr.maso = data.mssv.toUpperCase();
      usr.email = data.email;
      usr.ho_ten = data.ten;
      usr.gioi_tinh = data.gioi_tinh === "nam" ? 1 : 0;
      usr.gId = data.chucvu;
      usr.bId = data.bomon;
      await postData(API_BASE_URL + "/user", { user: usr });
      enqueueSnackbar("Thêm thành công", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setLoad((e) => e + 1);
      handleClose();
      reset();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const editAccount = (id) => {
    console.log(id);
  };

  const hiddenAccount = (id) => {
    console.log(id);
  };

  const columnName = ["MS", "Họ tên", "Bộ môn", "Chức vụ", ""];

  //table

  const search = (data) => {
    setSearchDt(data.search);
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
      </div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#2554A6" }}>
            <TableRow>
              {columnName.map((column, idx) => (
                <TableCell sx={{ color: "#fff" }} key={idx}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data
            )?.map((e, idx) => (
              <TableRow key={idx}>
                <TableCell>{e?.maso}</TableCell>
                <TableCell>{e?.ho_ten}</TableCell>
                <TableCell>{e?.bomon.name}</TableCell>
                <TableCell>
                  {e?.groups[0].groupname === "SINHVIEN" ? "Sinh viên" : null}
                  {e?.groups[0].groupname === "GIANGVIEN" ? "Giảng viên" : null}
                  {e?.groups[0].groupname === "NGHIENCUUSINH"
                    ? "Nghiên cứu sinh"
                    : null}
                </TableCell>
                <TableCell>
                  <Box sx={{ "& button": { m: 1 } }}>
                    {e?.active === 1 ? (
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        endIcon={<VisibilityOff />}
                        // onClick={() => setActive(e.id, 0)}
                      >
                        Ẩn
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        endIcon={<Visibility />}
                        // onClick={() => setActive(e.id, 1)}
                      >
                        Hiện
                      </Button>
                    )}
                    <Button
                      onClick={() => handleOpenEditAccount()}
                      className="ml-2"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                    >
                      Chỉnh sửa
                    </Button>
                    <Modal
                      open={openEditAccount}
                      onClose={handleCloseEditAccount}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleEditAccount}>
                        <p className="my-2 text-center text-[30px] font-medium">
                          Chỉnh sửa tài khoản
                        </p>
                        <form onSubmit={handleSubmitEdit(editAccount)}>
                          <div className="mb-4">
                            <p className="mb-1 font-medium">Họ tên</p>
                            <input
                              type="text"
                              name="hoten"
                              {...registerEdit("hoten")}
                              className="w-full py-2 px-4 border border-gray-600 rounded-md outline-none"
                            />
                          </div>
                          <div className="mb-4">
                            <p className="mb-1 font-medium">Bộ môn</p>
                            <select
                              name="bomon"
                              {...registerEdit("bomon")}
                              className="w-full py-2 px-4 border border-gray-600 rounded-md outline-none"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <p className="mb-1 font-medium">Chức vụ</p>
                            <select
                              name="chucvu"
                              {...registerEdit("chucvu")}
                              className="w-full py-2 px-4 border border-gray-600 rounded-md outline-none"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <p className="mb-1 font-medium">Mã số</p>
                            <input
                              type="text"
                              name="maso"
                              {...registerEdit("maso")}
                              className="w-full py-2 px-4 border border-gray-600 rounded-md outline-none"
                            />
                          </div>

                          <div className="relative flex gap-2 items-center">
                            <p className="mb-1 font-medium">Giới tính</p>
                            <input
                              id="nam"
                              name="gioitinh"
                              value="nam"
                              {...registerEdit("gioitinh")}
                              type="radio"
                            />
                            <label htmlFor="nam">Nam</label>
                            <input
                              id="nu"
                              name="gioitinh"
                              value="nu"
                              {...registerEdit("gioitinh")}
                              type="radio"
                            />
                            <label htmlFor="nu">Nữ</label>
                            <p className="absolute -bottom-4 text-[12px] text-red-600">
                              {errors.gioitinh?.message}
                            </p>
                          </div>
                          <div className="mb-4">
                            <p className="mb-1 font-medium">Email</p>
                            <input
                              type="text"
                              name="email"
                              {...registerEdit("email")}
                              className="w-full py-2 px-4 border border-gray-600 rounded-md outline-none"
                            />
                          </div>
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => handleCloseEditAccount()}
                              className="py-2 px-4 min-w-[100px] border border-yellow-400 rounded-md font-medium shadow-md"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              className="py-2 px-4 min-w-[100px] bg-yellow-400 rounded-md font-medium shadow-md"
                            >
                              Sửa
                            </button>
                          </div>
                        </form>
                      </Box>
                    </Modal>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, { label: "all", value: -1 }]}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage="Hàng mỗi dòng"
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
                {bomon?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              <p className="absolute text-[12px] text-red-600">
                {errors.bomon?.message}
              </p>
            </div>
            <div className="relative my-5">
              <p className="mb-1 font-bold">Chức vụ</p>
              <select
                className="w-full py-1 px-4 border border-slate-500 rounded-lg outline-none"
                name="chucvu"
                {...register("chucvu")}
              >
                <option value={1}>Sinh viên</option>
                <option value={2}>Giảng viên</option>
                <option value={1}>Nghiên cứu sinh</option>
              </select>
              <p className="absolute text-[12px] text-red-600">
                {errors.chucvu?.message}
              </p>
            </div>
            <div className="relative my-5">
              <p className="mb-1 font-bold">Mã Số</p>
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
  );
}

export default Account;
