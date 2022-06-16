import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";

import bgLogin from "../../assets/images/bg_login.jpg";

var arr = [
  {
    taikhoan: "B1809248",
    matkhau: "12345",
    role: "admin",
  },
];

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [hidden, setHidden] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const a = arr.filter((e) => e.taikhoan === data.taikhoan && e.matkhau === data.matkhau);
    if (a.length > 0 && a[0].role === "admin") {
      navigate("/admin");
    }
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
                name="taikhoan"
                placeholder="Tài khoản"
                {...register("taikhoan", {required: true})}
              />
              <p className="absolute text-[14px] text-red-600">
                {errors.taikhoan?.type === "required" && "Vui lòng nhập tài khoản"}
              </p>
            </div>
            <div className="relative mb-8">
              <input
                className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                type={hidden === true ? "text" : "password"}
                name="matkhau"
                placeholder="Mật khẩu"
                {...register("matkhau", {required: true})}
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
