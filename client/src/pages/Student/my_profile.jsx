import React, {useState} from 'react'
import {IoMdLock} from 'react-icons/io'
import {FaUserEdit, FaUser} from 'react-icons/fa'
import {HiOutlineDocumentText} from 'react-icons/hi'
import {Link} from 'react-router-dom'

function MyProfile() {
  const [show, setShow] = useState(false)

  const open = () => {
    setShow(!show)
  }

  const close = () => {
    setShow(!show)
  }

  return (
    <div>
      <div className="w-full">
        <div className="flex gap-5">
          <div className="relative w-[160px] h-[160px] bg-slate-200 rounded-md">
            <FaUser
              size={100}
              color="#747474"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
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
        <div className="relative text-white z-50">
          <button
            onClick={() => open()}
            className="flex items-center px-4 py-2 text-white bg-[#F38E46] rounded-md"
          >
            Tài liệu của tôi <HiOutlineDocumentText className="ml-2" size={20} />
          </button>
          {show === true && (
            <>
              <div className="absolute top-[60px] w-[150px] p-4 bg-white rounded-md after:content-['*'] after:w-[25px] after:h-[25px] after:absolute after:top-[-12px] after:z-10 after:right-[60px] after:bg-white after:rotate-45">
                <p
                  onClick={close}
                  className="relative py-2 text-center px-6 mb-2 rounded-md bg-[#F38E46] z-20 cursor-pointer"
                >
                  Đã lưu
                </p>
                <p
                  onClick={close}
                  className="relative py-2 text-center px-6 rounded-md bg-[#F38E46] z-20 cursor-pointer"
                >
                  Tải lên
                </p>
              </div>
            </>
          )}
        </div>
        <Link to="/student/forgot_password/id">
          <button className="flex items-center px-4 py-2 text-white bg-[#F38E46] rounded-md">
            Đổi mật khẩu <IoMdLock className="ml-2" size={20} />
          </button>
        </Link>
        <Link to="/student/edit_profile/id">
          <button className="flex items-center px-4 py-2 text-white bg-[#F38E46] rounded-md">
            Chỉnh sửa thông tin cá nhân <FaUserEdit className="ml-2" size={20} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MyProfile
