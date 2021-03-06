import React, { useState } from "react";
import { IoMdLock } from "react-icons/io";
import { FaUserEdit, FaUser } from "react-icons/fa";
import {AiOutlineCloudUpload, AiOutlineDisconnect} from "react-icons/ai";
import { Link, useMatch, useParams } from "react-router-dom";
import { getUserInfo } from "../../reducers/profile";
import { useDispatch, useSelector } from "react-redux";
import ModalEditProFile from "./modalEditProfile";
import { useForm } from "react-hook-form";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { useSnackbar } from "notistack";
import {fnGetUserInfo, fnSaveTaiLieu, fnUnSaveTaiLieu} from "../../actions/profile/profileAction";
import { useEffect } from "react";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {checkTL} from "../../utils/checkTaiLieu";

const formatDate = (date) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

const schema = yup
  .object({
    ho_ten: yup.string().required("Vui lòng nhập tên"),
    ngay_sinh: yup.string().required("Vui lòng nhập ngày sinh"),
    dia_chi: yup.string().required("Vui lòng nhập địa chỉ"),
    gioi_tinh: yup.string().nullable().required("Vui lòng chọn giới tính"),
    sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  })
  .required();

//---------------------------------------------------------------------------------
function MyProfile() {
  const { id } = useParams();
  const [listImage, setListImage] = useState([]);
  const [profile, setProfile] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const user = useSelector((state) => getUserInfo(state));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [check, setCheck] = useState(false);
  const [tailieu, setTailieu] = useState([]);
  const [khoahoc, setKhoaHoc] = useState([]);
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { t, i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await $http.getData(
        CONFIG.API_BASE_URL + "/user/profile/" + id
      );
      setProfile(res.data);
      setRole(res.data.role[0]?.groupname);
      setImageUrl([
        { url: CONFIG.API_BASE_URL + "/avatar/" + res.data?.avatar?.path_name },
      ]);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const res = await $http.getData(CONFIG.API_BASE_URL + "/tailieugv/" + id);
      setTailieu(res.data);
      const kh = await $http.getData(
        CONFIG.API_BASE_URL + "/course/maso/" + id
      );
      setKhoaHoc(kh.data);
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      const gt = values.gioi_tinh === "nam" ? 1 : 0;
      values.gioi_tinh = gt;
      await $http.putData(CONFIG.API_BASE_URL + "/user/profile", {
        profile: values,
      });
      dispatch(await fnGetUserInfo(profile.maso));
      enqueueSnackbar(`${t("alert.update_success")}`, {
        variant: "success",
        autoHideDuration: 3000,
      });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const uploadImage = async (e) => {
    let file = e.target.files;
    if (
      !(file[0]?.type === "image/jpeg" ||
      file[0]?.type === "image/png" ||
      file[0]?.type === "image/gif")
    ) {
      enqueueSnackbar(`${t("alert.select_image")}`, {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    setListImage(e.target.files);
    const imageNumber = e.target.files.length + imageUrl.length;
    if (imageNumber <= 5) {
      let i = 0;
      for (i; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!file) return;
        const base64 = await getBase64(file);
        setImageUrl([{ url: base64 }]);
      }
    }
    setCheck(true);
  };

  const btnActive = () => {
    document.getElementById("default-btn").click();
  };

  const submitAvt = async () => {
    try {
      const formDt = new FormData();
      formDt.append("avatar", listImage[0]);
      await $http.postData(
        CONFIG.API_BASE_URL + "/user/profile/upload",
        formDt,
        {
          "content-type": "multipart/form-data",
        }
      );
      enqueueSnackbar(`${t("alert.update_avatar_success")}`, {
        variant: "success",
        autoHideDuration: 3000,
      });
      dispatch(await fnGetUserInfo(profile.maso));
      setCheck(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderImage =
    imageUrl[0]?.url !== CONFIG.API_BASE_URL + "/avatar/undefined" ||
    !!profile.avatar?.path_name ? (
      <div className="relative">
        <img
          className="w-[200px] h-[200px] rounded-lg"
          src={imageUrl[0]?.url}
          alt="anhsanpham"
        />
      </div>
    ) : (
      <FaUser
        size={100}
        color="#747474"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );

  const saveTaiLieu = async (id, idtl) => {
    console.log(id, idtl);
    await $http.postData(CONFIG.API_BASE_URL + "/tailieu/save", {
      id: id,
      idtl: idtl,
    });
    enqueueSnackbar(`${t("alert.save_success")}`, {
      variant: "info",
      autoHideDuration: 3000,
    });
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex items-center gap-5 p-4 bg-white rounded-md">
          <div className="w-[30%]">
            <div className="relative mx-auto w-[200px] h-[200px] bg-slate-200 rounded-md">
              {renderImage}
              <input
                type="file"
                id="default-btn"
                className="hidden"
                name="file"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              {user?.maso === profile?.maso && (
                <AiOutlineCloudUpload
                  onClick={btnActive}
                  size={30}
                  color="#F38E46"
                  className="absolute bottom-1 right-1 cursor-pointer"
                />
              )}
              <div className="mt-2">
                {check && (
                  <button
                    onClick={submitAvt}
                    className="absolute -left-[68px] top-0 flex items-center justify-center min-w-[50px] p-2 text-white bg-[#F38E46] rounded-md"
                  >
                    Lưu
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-[70%]">
            <p className="text-[25px] font-bold uppercase">{profile?.ho_ten}</p>
            <p>
              <strong>
                {role === "GIANGVIEN" ? t("infor.no2") : t("infor.no1")}:{" "}
              </strong>
              {profile?.maso}
            </p>
            <p>
              <strong>{t("infor.gender")}: </strong>
              {profile?.gioi_tinh ? "Nam" : "Nữ"}
            </p>
            <p>
              <strong>{t("infor.birthday")}:</strong>{" "}
              {formatDate(profile?.ngay_sinh)}
            </p>
            <p>
              <strong>Email: </strong> {profile?.email}
            </p>
            <p>
              <strong>{t("infor.address")}: </strong> {profile?.dia_chi}
            </p>
            <p>
              <strong>{t("infor.phone")}: </strong> {profile?.sdt}
            </p>
            {user?.maso === profile?.maso && (
              <div className="flex gap-5 mt-5">
                <Link to="/app/forgot_password">
                  <button className="flex items-center justify-center min-w-[200px] px-4 py-2 text-white bg-[#F38E46] rounded-md">
                    {t("button.change_password")}
                    <IoMdLock className="ml-2" size={20} />
                  </button>
                </Link>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center min-w-[200px] px-4 py-2 text-white bg-[#F38E46] rounded-md"
                >
                  {t("button.edit_information")}
                  <FaUserEdit className="ml-2" size={20} />
                </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalEditProFile
                    title={`${t("title.edit_information")}`}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    content={
                      <>
                        <div className="relative">
                          <input
                            className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                            type="text"
                            name="ho_ten"
                            placeholder={`${t("infor.name")}`}
                            {...register("ho_ten", {
                              value: profile?.ho_ten,
                              required: true,
                            })}
                          />
                          <p className="absolute -bottom-5 text-[12px] text-red-600">
                            {errors.ho_ten?.message}
                          </p>
                        </div>

                        <div className="relative mt-8">
                          <input
                            className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                            type="date"
                            name="ngay_sinh"
                            placeholder={`${t("infor.birthday")}`}
                            {...register("ngay_sinh", {
                              value: new Date(profile.ngay_sinh),
                              required: true,
                            })}
                          />
                          <p className="absolute -bottom-5 text-[12px] text-red-600">
                            {errors.ngay_sinh?.message}
                          </p>
                        </div>

                        <div className="relative flex items-center mt-6">
                          <input
                            id="default-radio-1"
                            type="radio"
                            name="gioi_tinh"
                            value="nam"
                            {...register("gioi_tinh", {
                              value: profile?.gioi_tinh ? "nam" : "nu",
                            })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {t("title.male")}
                          </label>
                          <input
                            id="default-radio-2"
                            type="radio"
                            name="gioi_tinh"
                            value="nu"
                            {...register("gioi_tinh", {
                              value: profile?.gioi_tinh ? "nam" : "nu",
                            })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {t("title.female")}
                          </label>
                          <p className="absolute -bottom-5 text-[12px] text-red-600">
                            {errors.gioi_tinh?.message}
                          </p>
                        </div>

                        <div className="relative mt-6">
                          <input
                            className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                            type="text"
                            name="dia_chi"
                            placeholder={`${t("infor.address")}`}
                            {...register("dia_chi", {
                              value: profile?.dia_chi,
                              required: true,
                            })}
                          />
                          <p className="absolute -bottom-5 text-[12px] text-red-600">
                            {errors.dia_chi?.message}
                          </p>
                        </div>

                        <div className="relative mt-8">
                          <input
                            className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                            type="text"
                            name="sdt"
                            placeholder={`${t("infor.phone")}`}
                            {...register("sdt", {
                              value: profile?.sdt,
                              required: true,
                            })}
                          />
                          <p className="absolute -bottom-5 text-[12px] text-red-600">
                            {errors.sdt?.message}
                          </p>
                        </div>
                      </>
                    }
                    action={
                      <>
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          {t("button.cancel")}
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          {t("button.save")}
                        </button>
                      </>
                    }
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-[20px] font-bold">
          {role === "GIANGVIEN"
            ? t("title.course")
            : t("title.registered_course")}
        </p>
        <div className="grid grid-cols-4 gap-2 mt-3 p-3 text-center bg-[#D9D9D9] rounded-md">
          {khoahoc.length > 0 &&
            khoahoc?.map((e, idx) => {
              if (e.active) {
                return (
                  <Link key={idx} to={`/app/course/detail/${e.idkh}`}>
                    <div className="p-2 bg-white rounded-md">
                      <p>
                        <strong>
                          {e?.ma_khoa_hoc} - {e?.ten_khoa_hoc}
                        </strong>
                      </p>
                    </div>
                  </Link>
                );
              }
            })}
        </div>
      </div>
      <div className="my-5">
        <p className="text-[20px] font-bold">{t("title.document")}</p>
        <div className="w-full mt-3  grid grid-cols-4 gap-2">
          {tailieu?.map((e, idx) => {
            if (e.active) {
              return (
                <div key={idx} className="bg-white p-3 rounded-md">
                  <Link to={"/app/document/detail/" + e.id}>
                    <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
                    <p>
                      <strong>{e.name}</strong>
                    </p>
                  </Link>
                  <span>
                    {t("title.create_by")} <strong>{e.user.ho_ten}</strong>
                  </span>
                  <div className="flex flex-wrap space-x-2 items-start">
                    {e.linhvucs?.map((e2, i) => (
                      <Link to={"/app/tailieu/linhvuc/"+e2.name}>
                        <span
                            key={i}
                            className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                        >
                        {e2.name}
                      </span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex justify-end items-center gap-5">
                    {e?.user?.maso !== user?.maso && <div
                        className="flex items-center gap-2 p-2 cursor-pointer bg-yellow-300 rounded-md shadow-md"
                    >

                      {
                        !checkTL(e.id, user.tl) ? <MdOutlineDataSaverOn
                            color="#2979ff"
                            className="ml-auto mr-0 cursor-pointer"
                            onClick={async () => dispatch(await fnSaveTaiLieu(user.id, e.id, user.maso))}
                        /> : <AiOutlineDisconnect
                            color="#2979ff"
                            onClick={async () => dispatch(await fnUnSaveTaiLieu(user.id, e.id, user.maso))}
                            className="ml-auto mr-0 cursor-pointer"/>
                      }
                    </div>}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
