import React, {useState} from 'react'
import {IoMdLock} from 'react-icons/io'
import {FaUserEdit, FaUser} from 'react-icons/fa'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {Link} from 'react-router-dom'

function MyProfile() {
  const [imageUrl, setImageUrl] = useState([])
  const [listImage, setListImage] = useState([])

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (err) => {
        reject(err)
      }
    })
  }

  const uploadImage = async (e) => {
    setListImage(e.target.files)
    const imageNumber = e.target.files.length + imageUrl.length
    if (imageNumber <= 5) {
      let i = 0
      for (i; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        if (!file) return
        const base64 = await getBase64(file)
        setImageUrl([{url: base64}])
      }
    }
  }

  const btnActive = () => {
    document.getElementById('default-btn').click()
  }

  const renderImage =
    imageUrl.length > 0 ? (
      <div className="relative">
        <img
          className="w-[200px] h-[200px] rounded-lg"
          src={`${imageUrl[0].url}`}
          alt="anhsanpham"
        />
      </div>
    ) : (
      <FaUser
        size={100}
        color="#747474"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    )

  return (
    <div>
      <div className="w-full">
        <div className="flex gap-5 p-4 bg-white rounded-md">
          <div className="w-[30%]">
            <div className="relative mx-auto w-[200px] h-[200px] bg-slate-200 rounded-md">
              {renderImage}
              <input
                type="file"
                id="default-btn"
                className="hidden"
                name="file"
                onChange={(e) => {
                  uploadImage(e)
                }}
              />
              <AiOutlineCloudUpload
                onClick={btnActive}
                size={30}
                color="#3d3d3d"
                className="absolute bottom-1 right-1 cursor-pointer"
              />
            </div>
          </div>
          <div className="w-[70%]">
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
              <strong>Địa chỉ:</strong> 30/4 Hưng Lợi, Ninh Kiều, Cần Thơ
            </p>
            <p>
              <strong>Số điện thoại:</strong> 0398423952
            </p>
            <div className="flex gap-5 mt-5">
              {/* <div className="relative text-white z-50">
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
        </div> */}
              <Link to="/user/forgot_password/id">
                <button className="flex items-center justify-center min-w-[200px] px-4 py-2 text-white bg-[#F38E46] rounded-md">
                  Đổi mật khẩu <IoMdLock className="ml-2" size={20} />
                </button>
              </Link>
              <Link to="/user/edit_profile/id">
                <button className="flex items-center justify-center min-w-[200px] px-4 py-2 text-white bg-[#F38E46] rounded-md">
                  Chỉnh sửa thông tin <FaUserEdit className="ml-2" size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <p className="text-[20px] font-bold">Tài liệu</p>
        <div className="w-[250px] mt-3">
          <Link to="">
            <div className="bg-white p-3 rounded-md">
              <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
              <p>
                <strong>Báo cáo cuối kỳ</strong>
              </p>
              <p>
                <span className="text-[12px] text-white bg-[#F38E46] rounded-full mr-2 px-[8px] py-1">
                  Máy học
                </span>
                <span className="text-[12px] text-white bg-[#F38E46] rounded-full mr-2 px-[8px] py-1">
                  ML
                </span>
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[20px] font-bold">Khóa học đã nghi danh</p>
        <div className="grid grid-cols-4 gap-2 mt-3 p-3 text-center bg-[#D9D9D9] rounded-md">
          <div className="p-2 bg-white rounded-md">
            <p>
              <strong>CT178 - Nguyên lý hệ điều hành</strong>
            </p>
          </div>
          <div className="p-2 bg-white rounded-md">
            <p>
              <strong>CT178 - Nguyên lý hệ điều hành</strong>
            </p>
          </div>
          <div className="p-2 bg-white rounded-md">
            <p>
              <strong>CT178 - Nguyên lý hệ điều hành</strong>
            </p>
          </div>
          <div className="p-2 bg-white rounded-md">
            <p>
              <strong>CT178 - Nguyên lý hệ điều hành</strong>
            </p>
          </div>
          <div className="p-2 bg-white rounded-md">
            <p>
              <strong>CT178 - Nguyên lý hệ điều hành</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
