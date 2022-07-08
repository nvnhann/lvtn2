import React from "react";
import { useForm } from "react-hook-form";
import { VscKey } from "react-icons/vsc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t, i18n } = useTranslation();

  let schema = yup.object().shape({
    pwd: yup.string().required(`${t("errors.err_1")}`),
    newpwd: yup
      .string()
      .min(8, `${t("errors.err_2")}`)
      .required(`${t("errors.err_1")}`),
    renewpwd: yup
      .string()
      .required(`${t("errors.err_3")}`)
      .oneOf([yup.ref("newpwd")], `${t("errors.err_4")}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { enqueueSnackbar } = useSnackbar();
  const updatePassword = async (data) => {
    try {
      await $http.postData(CONFIG.API_BASE_URL + "/user/forgotpass", data);
      enqueueSnackbar("Cập nhật mật khẩu thành công", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div>
      <div className="flex gap-5 items-center py-4 px-6 mx-auto w-[70%] bg-[#2554A6] rounded-md">
        <VscKey size={30} color="#fff" />
        <p className="text-[25px] font-medium text-white">
          {t("title.change_password")}
        </p>
      </div>
      <form onSubmit={handleSubmit(updatePassword)}>
        <div className="mt-5 mx-auto w-[70%] p-6 bg-white rounded-md">
          <div className="relative flex items-center mb-8">
            <p className="w-[40%] font-medium text-[18px]">
              {t("title.current_password")}
            </p>
            <input
              className="items-center px-4 py-2 w-[60%] rounded-lg bg-slate-200 outline-none"
              type="password"
              name="pwd"
              {...register("pwd")}
            />
            {errors.pwd && (
              <span className="absolute top-11 right-[340px] text-[12px] text-red-500">
                {errors.pwd.message}
              </span>
            )}
          </div>
          <div className="relative flex items-center mb-8">
            <p className="w-[40%] font-medium text-[18px]">
              {t("title.new_password")}
            </p>
            <input
              className=" px-4 py-2 w-[60%] rounded-lg bg-slate-200 outline-none"
              type="password"
              name="newpwd"
              {...register("newpwd")}
            />
            {errors.newpwd && (
              <span className="absolute top-11 left-[318px] text-[12px] text-red-500">
                {errors.newpwd.message}
              </span>
            )}
          </div>
          <div className="relative flex items-center mb-8">
            <p className="w-[40%] font-medium text-[18px]">
              {t("title.confirm_password")}
            </p>
            <input
              className=" px-4 py-2 w-[60%] rounded-lg bg-slate-200 outline-none"
              type="password"
              name="renewpwd"
              {...register("renewpwd")}
            />
            {errors.renewpwd && (
              <span className="absolute top-11 right-[325px] text-[12px] text-red-500">
                {errors.renewpwd.message}
              </span>
            )}
          </div>
          <button className="block ml-auto mr-0 mt-4 py-2 px-6 text-white font-medium bg-[#F38E46] rounded-md">
            {t("button.save")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
