import React from 'react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {FaUser, FaChevronRight} from 'react-icons/fa'

const user = {
  ten: 'Dao Minh Khoa',
  gioitinh: 'nam',
  email: 'abc@gmail.com',
  sdt: '8937248932749',
  diachi: 'aaa bbb ccc dd ddd',
}

const defaultValues = {
  fullname: '',
  sex: '',
  email: '',
  address: '',
  phone: '',
}

function EditProfile() {
  const [selectName, setSelectName] = useState(false)
  const [selectSex, setSelectSex] = useState(false)
  const [selectAddress, setSelectAddress] = useState(false)
  const [selectPhone, setSelectPhone] = useState(false)
  const [imageUrl, setImageUrl] = useState([])
  const [listImage, setListImage] = useState([])

  const {register, handleSubmit, reset} = useForm({defaultValues: defaultValues})

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

  const updateProdfile = (data) => {
    console.log(data)
  }

  return (
    <div className="flex gap-5">
      <div className="w-[70%] px-5">
        <form onSubmit={handleSubmit((data) => updateProdfile(data))}>
          <p className="mb-6 text-[25px] font-bold">Thông tin cơ bản</p>
          <div className="flex justify-between items-center mb-4 px-4 h-[45px] bg-white rounded-md">
            <p className="w-[30%]">
              <strong>Tên</strong>
            </p>
            {selectName === false ? (
              <>
                <p className="w-[60%]">{user.ten}</p>
              </>
            ) : (
              <div className="w-[60%]">
                <input
                  {...register('fullname')}
                  name="fullname"
                  type="text"
                  placeholder={`${user.ten}`}
                  className="w-[250px] py-1 px-4 bg-slate-100 rounded-md outline-none"
                />
              </div>
            )}
            <FaChevronRight
              onClick={() => {
                setSelectName(!selectName)
                reset({fullname: ''})
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center mb-4 px-4 h-[45px] bg-white rounded-md">
            <p className="w-[30%]">
              <strong>Giới tính</strong>
            </p>
            {selectSex === false ? (
              <>
                <p className="w-[60%]">{user.gioitinh}</p>
              </>
            ) : (
              <div className="w-[60%]">
                <select
                  name="sex"
                  {...register('sex')}
                  className="w-[250px] py-1 px-4 bg-slate-100 rounded-md outline-none"
                >
                  <option value="">Nam</option>
                  <option value="">Nữ</option>
                </select>
              </div>
            )}
            <FaChevronRight
              onClick={() => {
                setSelectSex(!selectSex)
                reset({sex: ''})
              }}
              className="cursor-pointer"
            />
          </div>
          <p className="mb-6 text-[25px] font-bold">Thông tin liên hệ</p>
          <div className="flex justify-between items-center mb-4 px-4 h-[45px] bg-white rounded-md">
            <p className="w-[51%]">
              <strong>Email</strong>
            </p>
            <p className="w-full">{user.email}</p>
          </div>
          <div className="flex justify-between items-center mb-4 px-4 h-[45px] bg-white rounded-md">
            <p className="w-[30%]">
              <strong>Địa chỉ</strong>
            </p>
            {selectAddress === false ? (
              <>
                <p className="w-[60%]">{user.diachi}</p>
              </>
            ) : (
              <div className="w-[60%]">
                <input
                  {...register('address')}
                  name="address"
                  type="text"
                  placeholder={`${user.diachi}`}
                  className="w-[250px] py-1 px-4 bg-slate-100 rounded-md outline-none"
                />
              </div>
            )}
            <FaChevronRight
              onClick={() => {
                setSelectAddress(!selectAddress)
                reset({address: ''})
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center mb-4 px-4 h-[45px] bg-white rounded-md">
            <p className="w-[30%]">
              <strong>Số điện thoại</strong>
            </p>
            {selectPhone === false ? (
              <>
                <p className="w-[60%]">{user.sdt}</p>
              </>
            ) : (
              <div className="w-[60%]">
                <input
                  {...register('phone')}
                  name="phone"
                  type="text"
                  placeholder={`${user.sdt}`}
                  className="w-[250px] py-1 px-4 bg-slate-100 rounded-md outline-none"
                />
              </div>
            )}
            <FaChevronRight
              onClick={() => {
                setSelectPhone(!selectPhone)
                reset({phone: ''})
              }}
              className="cursor-pointer"
            />
          </div>

          <button className="block mt-5 mx-auto px-4 py-2 text-white font-medium bg-[#F38E46] rounded-md">
            Cập nhật thông tin cá nhân
          </button>
        </form>
      </div>
      <div className="w-[30%] text-center bg-slate-50 rounded-md">
        <div className="relative mt-5 mx-auto w-[200px] h-[200px] bg-slate-200 rounded-md">
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
        </div>
        <button
          onClick={btnActive}
          className="mt-5 px-4 py-2 text-white font-medium bg-orange-500 rounded-md"
        >
          Thay đổi ảnh
        </button>
      </div>
    </div>
  )
}

export default EditProfile
