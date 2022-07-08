import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AiTwotoneFileExcel, AiOutlineSearch} from "react-icons/ai";
import {DataGrid} from "@mui/x-data-grid";
import {getData} from "../../utils/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
import {TableCell, TableContainer, TableHead, TableRow, Table, TablePagination, Button, TableBody} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

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
    const [data, setData] = useState([]);
    const handleOpen = () => setOpen(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
            const res = await getData(API_BASE_URL + '/user');
            setData((res.data))
        })()
    }, []);

    console.log(data)
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({resolver: yupResolver(schema)});

    const {register: registerSearch, handleSubmit: handleSubmitSearch} =
        useForm();

    //Data form
    const createAccount = (data) => console.log(data);

    const editAccount = (id) => {
        console.log(id);
    };

    const hiddenAccount = (id) => {
        console.log(id);
    };

    const columnName = [
        "MS", "Họ tên", "Bộ môn", "Chức vụ", ""
    ];


    //table


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
                    <button
                        className="px-4 py-2 my-2 bg-yellow-400 font-medium rounded-md inline-flex items-center hover:opacity-90 active:opacity-50 duration-300">
                        Thêm tài khoản
                        <AiTwotoneFileExcel className="ml-2" color="#064e3b"/>
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
                                <AiOutlineSearch size={25} color="#fff"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#2554A6"}}>
                        <TableRow>
                            {columnName.map((column, idx) => (
                                <TableCell sx={{color: "#fff"}} key={idx}>
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
                                <TableCell>{e?.active === 1 ? "Hoạt động" : "Ẩn"}</TableCell>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25, {label: "all", value: -1}]}
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
                            <button
                                className="py-2 px-4 bg-yellow-400 font-bold rounded-md shadow-md hover:opacity-80 duration-300">
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
