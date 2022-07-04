import React, { useState } from "react";
import { AiTwotoneFileExcel } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <button
        onClick={handleOpenCourse}
        className="px-4 py-2 my-2 mr-6 font-medium bg-yellow-400 rounded-md"
      >
        Thêm khóa học
      </button>
      <button className="px-4 py-2 my-2 font-medium bg-yellow-400 rounded-md inline-flex items-center">
        Thêm khóa học <AiTwotoneFileExcel className="ml-2" color="#064e3b" />
      </button>

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
                <strong>Giảng viên</strong>
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
