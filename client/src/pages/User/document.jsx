import React, {useEffect, useState} from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { t } from "i18next";
import DocumentSave from "./document_save";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../reducers/profile";
import {getData} from "../../utils/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
import {AiOutlineDisconnect} from "react-icons/ai";
import {fnUnSaveTaiLieu} from "../../actions/profile/profileAction";
import {useSnackbar} from "notistack";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import {BsFillEyeSlashFill} from "react-icons/bs";
import {IoEyeSharp} from "react-icons/io5";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

function Document() {
  const [tailieu, setTailieu] = useState();
  const user = useSelector(state => getUserInfo(state));
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  //-----------------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const {enqueueSnackbar} = useSnackbar();
  const [data, setData] = useState([]);
  const [lv, setLv] = useState([]);
  const [LV, setLV] = useState([]);
  const [lvd, setLvd] = useState([]);
  const [idtl, setIdtl] = useState(null);
  const [openSetactive, setOpenSetactive] = useState(false);
  useEffect(()=>{
    (async ()=>{
      const res = await getData(API_BASE_URL+'/tailieu/save');
      setTailieu((res.data))

      //-------------------------------------
      const reslv = await $http.getData(CONFIG.API_BASE_URL + "/linhvuc");
      await setLv(reslv.data);
      await setLvd(reslv.data);
      const restl = await $http.getData(CONFIG.API_BASE_URL + "/tailieugv/" + user?.maso);
      setData(restl.data);

    })()
  },[load]);

  const setActiveTL = async (id, active) => {
    try {
      await $http.postData(CONFIG.API_BASE_URL + '/tailieu/active', {id: id, active: active});
      enqueueSnackbar(active === 1 ? 'Đã hiện tài liệu' : 'Đã ẩn tài liệu', {variant: "success", autoHideDuration: 3000});
      setLoad(e => e + 1)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteTaiLieu = async () => {
    try {
      await $http.deleteData(CONFIG.API_BASE_URL + '/tailieu/' + idtl);
      enqueueSnackbar('Xóa tài liệu thành công', {variant: 'success', autoHideDuration: 3000});
      setLoad(e => e + 1);
      setOpenSetactive(false)
      setIdtl(null);
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <div className="mb-4 text-white font-bold">
        <Link to="/app/document/save">
          <button className="px-6 py-2 bg-[#F38E46] rounded-md">
            {t("button.saved")}
          </button>
        </Link>
        <Link to="/app/document/upload">
          <button className="ml-4 px-6 py-2 bg-[#F38E46] rounded-md">
            {t("button.upload")}
          </button>
        </Link>
      </div>
      <div className="w-full  grid grid-cols-4 gap-2">
        {tailieu?.tailieus?.map((e, idx) => {
          if (e.active) {
            return (
                <div key={idx} className="bg-white p-3 rounded-md">
                  <Link  to={"/app/document/detail/" + e.id}>
                    <div
                        className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
                    <p>
                      <strong>{e.name}</strong>
                    </p>
                  </Link>
                  <span>tạo bởi <strong>{e.user.ho_ten}</strong></span>
                  <div className="flex flex-wrap space-x-2 items-start">
                    {e.linhvucs?.map((e2, i) => (
                        <span key={i} className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">{e2.name}</span>))}
                  </div>
                  <div>
                    <AiOutlineDisconnect  size={30}
                                          color="#2979ff"
                                          onClick={async () => {
                                            dispatch(await fnUnSaveTaiLieu(user.id,e.id, user.maso));
                                            setLoad(e=> e+1)
                                          }}
                                          className="ml-auto mr-0 cursor-pointer" />
                  </div>
                </div>
            )
          }
        })}

        {data?.map((e, idx) => (
            <div key={idx} className="bg-white p-3 rounded-md">
              <Link to={"/app/document/detail/" + e.id}>
                <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"/>
                <p>
                  <strong>{e.name}</strong>
                </p>
              </Link>
              <span>tạo bởi <strong>{e.user.ho_ten}</strong></span>
              <div className="flex flex-wrap space-x-2 items-start">
                {e.linhvucs?.map((e2, idx) => (
                    <span key={idx}
                          className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">{e2.name}</span>
                ))}
              </div>
              <div className="flex items-end my-2">
                {e.active &&
                    <BsFillEyeSlashFill onClick={() => setActiveTL(e.id, 0)} className="cursor-pointer"
                                        size={30} color="#2979ff"/>}
                {!e.active &&
                    <IoEyeSharp onClick={() => setActiveTL(e.id, 1)} className="cursor-pointer" size={30}
                                color="#2979ff"/>}
                <MdDelete
                    size={30}
                    color="#757575"
                    className="ml-auto mr-0 cursor-pointer"
                    onClick={() => {
                      setIdtl(e.id);
                      setOpenSetactive(true)
                    }}
                />
              </div>


            </div>
        ))}
      </div>
      <Modal open={openSetactive}
             onClose={() => setOpenSetactive(false)}
      >
        <Box sx={style}>
          <div className="text-center text-[25px] font-medium">Bạn chắc chắn muốn xóa tài liệu</div>
          <div className="flex gap-2 justify-end my-4">
            <button
                className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300"
                onClick={() => setOpenSetactive(false)}
            >
              Hủy
            </button>
            <button onClick={deleteTaiLieu} type="submit"
                    className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md hover:opacity-90 duration-300">
              Đồng ý
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Document;
