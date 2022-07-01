import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import * as $http from '../../utils/httpProvider';
import * as CONFIG from '../../config/configUrl';
import * as TokenUtils from "../../utils/tokenUtils";
import bgLogin from "../../assets/images/bg_login.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from "../../reducers/profile";
import { fnGetUserInfo } from "../../actions/profile/profileAction";

var arr = [
  {
    taikhoan: "admin",
    matkhau: "admin",
    role: "admin",
  },
  {
    taikhoan: "student",
    matkhau: "student",
    role: "student",
  },
  {
    taikhoan: "teacher",
    matkhau: "teacher",
    role: "teacher",
  },
];

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [hidden, setHidden] = useState(false);
  const profile = useSelector(state => getUserInfo(state));
  const dispatch = useDispatch();
  console.log(profile)
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const onSubmit = async data => {
    try {
      const res =await $http.postData(CONFIG.API_BASE_URL + '/user/login', data);
      console.log(res)
      if (res.data.data !== undefined) {
        TokenUtils.setToken(JSON.stringify(res.data.data));
        dispatch(fnGetUserInfo())
        const role = profile.role;
        if(role[0].groupname === 'SINHVIEN') navigate("/student");
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 2000,
      });

    }
    
   // const role = arr.filter((e) => e.taikhoan === data.taikhoan && e.matkhau === data.matkhau);
    // if (role.length > 0 && role[0].role === "admin") {
    //   navigate("/admin");
    // } else if (role.length > 0 && role[0].role === "student") {
    //   navigate("/student");
    // } else if (role.length > 0 && role[0].role === "teacher") {
    //   navigate("/teacher");
    // } else {
 
    // }

    // enqueueSnackbar("Đăng nhập thành công", {
    //   variant: "success",
    //   autoHideDuration: 2000,
    // });
  };

  return (
    <div className="flex">
      <img className="w-1/2 h-[100vh]" src={bgLogin} alt="background login" />
      <div className="relative w-1/2">
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-gradient-to-r from-orange-500 to-pink-500 rounded-tl-full opacity-50"></div>
        <div className="absolute w-[250px] h-[250px] bg-gradient-to-r from-purple-500 to-emerald-500 rounded-br-full opacity-60"></div>
        <div className="absolute z-50 w-1/2 py-10 px-5 bg-slate-200 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
          <p className="mb-10 text-[30px] text-center font-bold uppercase">Đăng Nhập</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-8">
              <input
                className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                type="text"
                name="maso"
                placeholder="Tài khoản"
                {...register("maso", {required: true})}
              />
              <p className="absolute text-[14px] text-red-600">
                {errors.taikhoan?.type === "required" && "Vui lòng nhập tài khoản"}
              </p>
            </div>
            <div className="relative mb-8">
              <input
                className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                type={hidden === true ? "text" : "password"}
                name="pwd"
                placeholder="Mật khẩu"
                {...register("pwd", {required: true})}
              />
              <p className="absolute text-[14px] text-red-600">
                {errors.matkhau?.type === "required" && "Vui lòng nhập mật khẩu"}
              </p>
              {hidden === false ? (
                <AiOutlineEyeInvisible
                  size={20}
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() => setHidden(true)}
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() => setHidden(false)}
                />
              )}
            </div>
            <button className="block mb-5 w-full text-white font-bold mx-auto px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-md">
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
