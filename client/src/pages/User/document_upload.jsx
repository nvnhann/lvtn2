import React, { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const schema = yup
  .object({
    tentailieu: yup.string().required("Vui lòng nhập tên tài liệu"),
    mota: yup.string().required("Vui lòng viết mô tả"),
  })
  .required();

function DocumentUpload() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    if (data.filetailieu.length) {
      console.log("Hiển thị thông báo");
      return;
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 py-2 px-4 text-white bg-[#F38E46] rounded-md"
      >
        Thêm tài liệu <HiOutlineDocumentAdd size={25} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-center text-[25px] font-medium">Thêm tài liệu</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-5">
              <p>Tên tài liệu</p>
              <input
                type="text"
                className="my-2 py-1 px-4 w-full border border-[#ccc] rounded-md"
                placeholder="Nhập tên tài liệu"
                name="tentailieu"
                {...register("tentailieu")}
              />
              <p className="absolute -bottom-4 text-[12px] text-red-600">
                {errors.tentailieu?.message}
              </p>
            </div>
            <div className="relative mb-5">
              <p>Mô tả</p>
              <input
                type="text"
                className="my-2 py-1 px-4 w-full border border-[#ccc] rounded-md"
                placeholder="Nhập mô tả"
                name="mota"
                {...register("mota")}
              />
              <p className="absolute -bottom-4 text-[12px] text-red-600">
                {errors.mota?.message}
              </p>
            </div>
            <div className="relative mb-5">
              <p>Chọn file</p>
              <input
                type="file"
                className="my-2"
                name="filetailieu"
                {...register("filetailieu")}
              />
            </div>
            <div className="flex gap-2 justify-end my-4">
              <button
                className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300">
                Thêm
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default DocumentUpload;
