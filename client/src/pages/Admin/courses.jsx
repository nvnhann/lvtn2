import React, { useEffect, useState } from "react";
import { AiTwotoneFileExcel } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { useSnackbar } from "notistack";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const schema = yup
  .object({
    makhoahoc: yup.string().required("Vui lòng nhập mã khóa học"),
    tenkhoahoc: yup.string().required("Vui lòng nhập tên khóa học"),
    giangvien: yup.string().required("Vui lòng nhập tên giảng viên"),
  })
  .required();

const styleAddCourse = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function Course() {
  const [openCourse, setOpenCourse] = useState(false);
  const handleOpenCourse = () => setOpenCourse(true);
  const handleCloseCourse = () => setOpenCourse(false);
  const [load, setLoad] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [check, setCheck] = useState(false);
  const [uploadFileCourse, setUploadFileCourse] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await $http.postData(CONFIG.API_BASE_URL + "/course", data);
      enqueueSnackbar("Thêm thành công", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setLoad((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error?.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  const setActive = async (idkh, active) => {
    try {
      const dt = {
        idkh: idkh,
        active: active,
      };
      await $http.postData(CONFIG.API_BASE_URL + "/course/active", dt);
      enqueueSnackbar("Cập nhật thành công!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setLoad((e) => e + 1);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await $http.getData(CONFIG.API_BASE_URL + "/course");
      setData(res.data);
      console.log(res.data);
    })();
  }, [load]);

  const columnName = [
    "Mã khóa học",
    "Tên khóa học",
    "Tên giảng viên",
    "Trạng thái",
    "",
  ];

  const clickBtn = () => {
    document.getElementById("uploadFileCourse").click();
  };

  const createKHFile = async () => {
    if (!uploadFileCourse) return;
    if (uploadFileCourse.length > 1)
      return enqueueSnackbar("Chỉ được upload 1 file", {
        variant: "error",
        autoHideDuration: 3000,
      });
    if (
      uploadFileCourse[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
      return enqueueSnackbar("Vui lòng upload file Excel", {
        variant: "error",
        autoHideDuration: 3000,
      });
    const formDt = new FormData();
    formDt.append("document", uploadFileCourse[0]);
    await $http.postData(CONFIG.API_BASE_URL + "/course/file", formDt, {
      "content-type": "multipart/form-data",
    });
    setLoad((e) => e + 1);
    setCheck(false);
    enqueueSnackbar("Thêm thành công", {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  return (
    <div>
      <button
        onClick={handleOpenCourse}
        className="px-4 py-2 my-2  font-medium bg-yellow-400 rounded-md"
      >
        Thêm khóa học
      </button>
      <button
        onClick={clickBtn}
        className="px-4 py-2 my-2 mx-6 font-medium bg-yellow-400 rounded-md inline-flex items-center"
      >
        Thêm khóa học <AiTwotoneFileExcel className="ml-2" color="#064e3b" />
      </button>
      {check && (
        <button
          onClick={createKHFile}
          className="px-4 py-2 my-2  font-medium bg-cyan-700 text-white rounded-md"
        >
          Lưu
        </button>
      )}
      <input
        onChange={(e) => {
          setUploadFileCourse(e.target.files);
          setCheck(true);
        }}
        type="file"
        id="uploadFileCourse"
        className="hidden"
      />

      <Box>
        <TableContainer component={Paper}>
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
                  <TableCell>{e?.ma_khoa_hoc}</TableCell>
                  <TableCell>{e?.ten_khoa_hoc}</TableCell>
                  <TableCell>{e?.ho_ten}</TableCell>
                  <TableCell>{e?.active === 1 ? "Hoạt động" : "Ẩn"}</TableCell>
                  <TableCell>
                    {e?.active === 1 ? (
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        endIcon={<VisibilityOff />}
                        onClick={() => setActive(e.id, 0)}
                      >
                        Ẩn
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        endIcon={<Visibility />}
                        onClick={() => setActive(e.id, 1)}
                      >
                        Hiện
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </TableContainer>
      </Box>

      <Modal
        open={openCourse}
        onClose={handleCloseCourse}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleAddCourse}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-[25px] text-center font-bold">Thêm khóa học</p>
            <div className="relative my-4">
              <p>
                <strong>Mã khóa học</strong>
              </p>
              <input
                className="w-full my-2 py-2 px-4 border border-slate-500 rounded-lg outline-none"
                type="text"
                name="makhoahoc"
                {...register("makhoahoc")}
              />
              <p className="absolute -bottom-3 text-[12px] text-red-600">
                {errors.makhoahoc?.message}
              </p>
            </div>
            <div className="relative my-4">
              <p>
                <strong>Tên khóa học</strong>
              </p>
              <input
                className="w-full my-2 py-2 px-4 border border-slate-500 rounded-lg outline-none"
                type="text"
                name="tenkhoahoc"
                {...register("tenkhoahoc")}
              />
              <p className="absolute -bottom-3 text-[12px] text-red-600">
                {errors.tenkhoahoc?.message}
              </p>
            </div>
            <div className="relative my-4">
              <p>
                <strong>Mã số CBGV</strong>
              </p>
              <input
                className="w-full my-2 py-2 px-4 border border-slate-500 rounded-lg outline-none"
                type="text"
                name="giangvien"
                {...register("giangvien")}
              />
              <p className="absolute -bottom-3 text-[12px] text-red-600">
                {errors.giangvien?.message}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseCourse}
                className="py-2 min-w-[75px] border-2 border-yellow-500 hover:bg-yellow-200 hover:border-yellow-400 font-medium rounded-md duration-300"
              >
                Hủy
              </button>
              <button className="py-2 min-w-[75px] bg-yellow-400 font-medium rounded-md hover:opacity-80 duration-300">
                Thêm
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Course;
