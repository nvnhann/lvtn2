import React from 'react'
import {useForm} from 'react-hook-form'
import {VscKey} from 'react-icons/vsc'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

let schema = yup.object().shape({
  pwd: yup.string().required('Vui lòng nhập mật khẩu'),
  newpwd: yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu'),
  renewpwd: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('newpwd')], 'Mật khẩu không khớp'),
})

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)})

  const updatePassword = (data) => {
    console.log(data)
  }

  return (
    <div>
      <div className="flex gap-5 items-center py-4 px-6 mx-auto w-[70%] bg-[#2554A6] rounded-md">
        <VscKey size={30} color="#fff" />
        <p className="text-[25px] font-medium text-white">Đổi mật khẩu</p>
      </div>
      <form onSubmit={handleSubmit((data) => updatePassword(data))}>
        <div className="mt-5 mx-auto w-[70%] p-6 bg-white rounded-md">
          <div className="relative flex items-center mb-8">
            <p className="w-[40%] font-medium text-[18px]">Mật khẩu hiện tại</p>
            <input
              className="items-center px-4 py-2 w-[60%] rounded-lg bg-slate-200 outline-none"
              type="text"
              name="pwd"
              {...register('currentpass')}
            />
            {errors.pwd && (
              <span className="absolute top-11 right-[340px] text-[12px] text-red-500">
                {errors.pwd.message}
              </span>
            )}
          </div>
          <div className="relative flex items-center mb-8">
            <p className="w-[40%] font-medium text-[18px]">Mật khẩu mới</p>
            <input
              className=" px-4 py-2 w-[60%] rounded-lg bg-slate-200 outline-none"
              type="text"
              name="newpwd"
              {...register('newpass')}
            />
            {errors.newpwd && (
              <span className="absolute top-11 right-[340px] text-[12px] text-red-500">
                {errors.newpwd.message}
              </span>
            )}
          </div>
          <div className="relative flex items-center mb-8">
            <p className="w-[40%] font-medium text-[18px]">Nhập lại mật khẩu mới</p>
            <input
              className=" px-4 py-2 w-[60%] rounded-lg bg-slate-200 outline-none"
              type="text"
              name="renewpwd"
              {...register('confirmnewpass')}
            />
            {errors.renewpwd && (
              <span className="absolute top-11 right-[325px] text-[12px] text-red-500">
                {errors.renewpwd.message}
              </span>
            )}
          </div>
          <button className="block ml-auto mr-0 mt-4 py-2 px-6 text-white font-medium bg-[#F38E46] rounded-md">
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
