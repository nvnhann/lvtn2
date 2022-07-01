import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {BiSearch} from 'react-icons/bi'

function Header() {
  const [show, setShow] = useState(false)
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()

  const handleProfile = () => {
    setShow(!show)
  }

  const close = () => {
    setShow(!show)
  }

  const logout = () => {
    navigate('/login')
  }

  const search = (data) => {
    if (data.search) navigate(`/teacher/search/${data.search}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center py-5 px-6 bg-[#2554A6] text-white">
        <p className="block w-[15%] text-[30px] font-bold">CIT</p>
        <form
          className="flex justify-center w-[70%]"
          onSubmit={handleSubmit((data) => search(data))}
        >
          <input
            className="py-2 px-4 w-[80%] rounded-l-md text-black outline-none"
            type="text"
            name="search"
            {...register('search')}
          />
          <button className="px-4 py-2 bg-white rounded-r-md border border-r">
            <BiSearch size={20} color="#000" />
          </button>
        </form>
        <div className="flex gap-4 justify-end items-center w-[15%]">
          <p>Đào Minh Khoa</p>
          <div className="relative">
            <FaUserCircle className="cursor-pointer" size={25} onClick={handleProfile} />
            {show === true ? (
              <div className="absolute -right-3 w-[200px] text-center top-[40px] p-3 bg-white rounded-md after:content-['*'] after:w-[25px] after:h-[25px] after:absolute after:top-[-12px] after:right-[10px] after:bg-white after:rotate-45 z-[100]">
                <Link to="/student/my_profile">
                  <p
                    onClick={() => close()}
                    className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                  >
                    Trang cá nhân
                  </p>
                </Link>
                <p
                  onClick={() => logout()}
                  className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                >
                  Đăng xuất
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
