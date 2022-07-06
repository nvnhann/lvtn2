import React, { useEffect, useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { useSnackbar } from "notistack";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
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
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(0);
  const [lv, setLv] = useState([]);
  const [LV, setLV] = useState([]);
  const [lvd, setLvd] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await $http.getData(CONFIG.API_BASE_URL + "/tailieu");
      setData(res.data);
      const reslv = await $http.getData(CONFIG.API_BASE_URL + "/linhvuc");
      await setLv(reslv.data);
      await setLvd(reslv.data);
    })();
  }, [load]);

  const handleClose = () => {
    setOpen(false);
    setLv(lvd);
    setLV([]);
    reset();
  };
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const tl = {};
      tl.tentailieu = values.tentailieu;
      tl.mota = values.mota;
      tl.lv =  await LV;
      const formDt = new FormData();
      formDt.append("document", values.file[0]);
      formDt.append("tailieu", JSON.stringify(tl));
      await $http.postData(CONFIG.API_BASE_URL + "/tailieu", formDt, {
        "content-type": "multipart/form-data",
      });
      enqueueSnackbar("Thêm thành công", {
        variant: "success",
        autoHideDuration: 3000,
      });
      handleClose();
      setLoad((e) => e + 1);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 py-2 my-2 px-4 text-white bg-[#F38E46] rounded-md"
      >
        Thêm tài liệu <HiOutlineDocumentAdd size={25} />
      </button>
      <div className="w-full  grid grid-cols-4 gap-2">
        {data?.map((e, idx) => (
          <div className="bg-white p-3 rounded-md">
            <Link key={idx} to={"/app/document/detail/" + e.id}>
              <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
              <p>
                <strong>{e.name}</strong>
              </p>
            </Link>
            <span>
              tạo bởi <strong>{e.users[0].ho_ten}</strong>
            </span>
            <div key={idx} className="flex flex-wrap space-x-2 items-start">
              {e.linhvucs?.map((e2, idx) => (
                <span className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                  {e2.name}
                </span>
              ))}
            </div>

            <MdDelete
              size={30}
              color="#757575"
              className="ml-auto mr-0 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-center text-[25px] font-medium">Thêm tài liệu</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Tên tài liệu</p>
            <input
              type="text"
              className="my-2 py-1 px-4 w-full border border-[#ccc] rounded-md"
              placeholder="Nhập tên tài liệu"
              name="tentailieu"
              {...register("tentailieu")}
            />
            <p>Mô tả</p>
            <textarea
              type="text"
              rows={4}
              className="my-2 py-1 px-4 w-full border border-[#ccc] rounded-md"
              placeholder="Nhập mô tả"
              name="mota"
              {...register("mota")}
            />
            <div className="flex flex-wrap justify-center space-x-2">
              {LV?.map((e, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    lv.push({ id: e.id, name: e.name });
                    setLV((state) => state.filter((e1) => e1.id !== e.id));
                  }}
                  className="px-4 py-2 my-2 rounded-full text-white-500 bg-orange-400 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                >
                  {e.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center space-x-2">
              {lv?.map((e, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    LV.push({ id: e.id, name: e.name });
                    setLv((state) => state.filter((e1) => e1.id !== e.id));
                  }}
                  className="px-4 py-2 my-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                >
                  {e.name}
                </span>
              ))}
            </div>
            <p>Chọn file</p>
            <input
              type="file"
              className="my-2"
              name="file"
              {...register("file")}
            />
            <div className="flex gap-2 justify-end my-4">
              <button
                className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button type="submit" className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300">
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
