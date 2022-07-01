import React, {useState} from 'react'
import {IoMdLock} from 'react-icons/io'
import {FaUserEdit, FaUser} from 'react-icons/fa'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {getUserInfo} from '../../reducers/profile'
import {useDispatch, useSelector} from 'react-redux'
import ModalEditProFile from './modalEditProfile'
import {useForm} from 'react-hook-form'
import * as $http from '../../utils/httpProvider'
import * as CONFIG from '../../config/configUrl'
import {useSnackbar} from 'notistack'
import {fnGetUserInfo} from '../../actions/profile/profileAction'
//----------------------------------------------------------
function MyProfile() {
  const [listImage, setListImage] = useState([])
  const profile = useSelector((state) => getUserInfo(state))
  const [imageUrl, setImageUrl] = useState([
    {url: CONFIG.API_BASE_URL + '/avatar/' + profile.avatar?.path_name},
  ])

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [check, setCheck] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()
  console.log(imageUrl[0].url)
  const onSubmit = async (values) => {
    try {
      const gt = values.gioi_tinh === 'nam' ? 1 : 0
      values.gioi_tinh = gt
      await $http.putData(CONFIG.API_BASE_URL + '/user/profile', {profile: values})
      dispatch(await fnGetUserInfo())
      enqueueSnackbar('Cập nhật thành công', {variant: 'success', autoHideDuration: 3000})
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }
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
    setCheck(true)
  }

  const btnActive = () => {
    document.getElementById('default-btn').click()
  }

  const submitAvt = async () => {
    try {
      const formDt = new FormData()
      formDt.append('avatar', listImage[0])
      await $http.postData(CONFIG.API_BASE_URL + '/user/profile/upload', formDt, {
        'content-type': 'multipart/form-data',
      })
      enqueueSnackbar('Cập nhật ảnh đại diện thành công', {
        variant: 'success',
        autoHideDuration: 3000,
      })
      dispatch(await fnGetUserInfo())
      setCheck(false)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(imageUrl)
  const renderImage =
    imageUrl[0].url !== CONFIG.API_BASE_URL + '/avatar/undefined' || !!profile.avatar?.path_name ? (
      <div className="relative">
        <img className="w-[200px] h-[200px] rounded-lg" src={imageUrl[0].url} alt="anhsanpham" />
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
                  uploadImage(e)
                }}
              />
              <AiOutlineCloudUpload
                onClick={btnActive}
                size={30}
                color="#3d3d3d"
                className="absolute bottom-1 right-1 cursor-pointer"
              />
              <div className="mt-2">
                {check && (
                  <button
                    onClick={submitAvt}
                    className="absolute flex items-center justify-center min-w-[50px] p-2 text-white bg-[#F38E46] rounded-md"
                  >
                    Lưu
                  </button>
                )}
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-[70%]">
            <p className="text-[25px] font-bold uppercase">{profile?.ho_ten}</p>
            <p>
              <strong>MSSV: </strong> {profile.maso}
            </p>
            <p>
              <strong>Giới tính: </strong> {profile?.gioi_tinh ? 'Nam' : 'Nữ'}
            </p>
            <p>
              <strong>Ngày sinh:</strong> 1/1/2111
            </p>
            <p>
              <strong>Email: </strong> {profile?.email}
            </p>
            <p>
              <strong>Địa chỉ: </strong> 30/4 Hưng Lợi, Ninh Kiều, Cần Thơ
            </p>
            <p>
              <strong>Số điện thoại: </strong> {profile?.sdt}
            </p>
            <div className="flex gap-5 mt-5">
              <Link to="/student/forgot_password/id">
                <button className="flex items-center justify-center min-w-[200px] px-4 py-2 text-white bg-[#F38E46] rounded-md">
                  Đổi mật khẩu <IoMdLock className="ml-2" size={20} />
                </button>
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center min-w-[200px] px-4 py-2 text-white bg-[#F38E46] rounded-md"
              >
                Chỉnh sửa thông tin <FaUserEdit className="ml-2" size={20} />
              </button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalEditProFile
                  title="Chỉnh sửa thông tin cá nhân"
                  showModal={showModal}
                  setShowModal={setShowModal}
                  content={
                    <>
                      <input
                        className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                        type="text"
                        name="ho_ten"
                        placeholder="Họ và tên"
                        {...register('ho_ten', {value: profile?.ho_ten, required: true})}
                      />
                      <div className="flex items-center my-4">
                        <input
                          id="default-radio-1"
                          type="radio"
                          name="gioi_tinh"
                          value="nam"
                          {...register('gioi_tinh', {value: profile?.gioi_tinh ? 'nam' : 'nu'})}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nam
                        </label>
                        <input
                          id="default-radio-2"
                          type="radio"
                          name="gioi_tinh"
                          value="nu"
                          {...register('gioi_tinh', {value: profile?.gioi_tinh ? 'nam' : 'nu'})}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nữ
                        </label>
                      </div>
                      <input
                        className="block w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                        type="text"
                        name="dia_chi"
                        placeholder="Địa chỉ"
                        {...register('dia_chi', {value: profile?.dia_chi, required: true})}
                      />
                      <input
                        className="block my-4 w-full px-4 py-2 border-2 border-slate-400 rounded-md outline-none"
                        type="text"
                        name="sdt"
                        placeholder="Số điện thoại"
                        {...register('sdt', {value: profile?.sdt, required: true})}
                      />
                    </>
                  }
                  action={
                    <>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Đóng
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Lưu
                      </button>
                    </>
                  }
                />
              </form>
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
