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
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();

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
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (values) => {
    try {
      const tl = {};
      tl.tentailieu = values.tentailieu;
      tl.mota = values.mota;
      tl.lv = await LV;
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
      if (values.file.length === 0) {
        enqueueSnackbar("Vui lòng chọn file", {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }
      if (values.file[0].size / 1024 / 1024 > 25) {
        enqueueSnackbar("File không được lớn hơn 25MB", {
          variant: "error",
          autoHideDuration: 3000,
        });
      } else {
        const tl = {};
        tl.tentailieu = values.tentailieu;
        tl.mota = values.mota;
        tl.lv = LV;
        console.log(tl);
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
      }
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
        {t("button.add_document")} <HiOutlineDocumentAdd size={25} />
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
              {t("label.create_by")} <strong>{e.users[0].ho_ten}</strong>
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
          <p className="text-center text-[25px] font-medium">
            {t("label.add_document")}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              <strong>{t("label.document_name")}</strong>
            </p>
            <div className="relative mt-2 mb-4">
              <input
                type="text"
                className=" py-1 px-4 w-full border border-[#ccc] rounded-md"
                placeholder={t("label.enter_name_document")}
                name="tentailieu"
                {...register("tentailieu")}
              />
              <p className="absolute -bottom-5 text-[14px] text-red-600">
                {errors.tentailieu?.message}
              </p>
            </div>
            <div className="mt-6 mb-2">
              <p>
                <strong>{t("label.describe")}</strong>
              </p>
              <textarea
                type="text"
                rows={4}
                className=" py-1 px-4 w-full border border-[#ccc] rounded-md"
                placeholder={t("label.enter_describe")}
                name="mota"
                {...register("mota")}
              />
            </div>
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
            <p>
              <strong>{t("label.select_file")}</strong>
            </p>
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
                {t("button.cancel")}
              </button>
              <button
                type="submit"
                className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300"
              >
                {t("button.add")}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default DocumentUpload;
