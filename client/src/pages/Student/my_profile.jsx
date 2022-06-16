import React from "react";
import {BiLockAlt} from "react-icons/bi";
import {RiUserSettingsLine} from "react-icons/ri";

function MyProfile() {
  return (
    <div>
      <div className="w-full">
        <div className="flex gap-5">
          <div className="w-[160px] h-[160px] bg-slate-200 rounded-md"></div>
          <div>
            <p className="text-[25px] font-bold uppercase">Đào Minh Khoa</p>
            <p>
              <strong>MSSV:</strong> B180xxxx
            </p>
            <p>
              <strong>Giới tính:</strong> Nam
            </p>
            <p>
              <strong>Email:</strong> abcxyz@student.ctu.edu.vn
            </p>
            <p>
              <strong>Địa chỉ:</strong> 30/4 Hứng Lợi, Ninh Kiều, Cần Thơ
            </p>
            <p>
              <strong>Số điện thoại:</strong> 0398423952
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-5">
        <button className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md">
          Đổi mật khẩu <BiLockAlt size={20} />
        </button>
        <button className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md">
          Chỉnh sửa thông tin cá nhân <RiUserSettingsLine size={20} />
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
