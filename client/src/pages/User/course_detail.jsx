import React from 'react'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {BsBook} from 'react-icons/bs'
import {FaUserAlt} from 'react-icons/fa'
import {IoSend} from 'react-icons/io5'

function CourseDetail() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <AiOutlineUnorderedList size={25} />
        <p className="text-[25px]">CT175 - Lý thuyết đồ thị</p>
      </div>
      <div className="relative flex items-center gap-2 my-2">
        <BsBook size={35} />
        <p className="text-[30px] font-bold text-[#47568A]">Buổi thực hành 1</p>
        <p className="absolute left-[45px] top-[40px]">Trần Việt Châu</p>
      </div>
      <hr className="mt-10 w-[90%] border-2 border-b-[#47568A]" />
      <div className="mt-8 w-[90%]">
        <p>Đề thực hành buổi 1: Các em xem chi tiết ở file sau</p>
        <div className="p-2 my-3 h-[150px] bg-white">
          <div></div>
          <div>
            <p>dethuchanh.pdf</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center p-2 w-[90%] bg-white rounded-md">
        <div className="w-[50px] h-[50px] bg-slate-200 rounded-full"></div>
        <div>
          <p>Câu 2 đã được chỉnh sửa nha các em</p>
        </div>
      </div>
      <div className="relative flex items-center gap-2 mt-2">
        <FaUserAlt size={30} />
        <input type="text" className="w-[87%] py-2 px-4 rounded-2xl border border-[#ccc] outline-none" />
        <IoSend size={30} className="absolute right-[120px] cursor-pointer" />
      </div>
    </div>
  )
}

export default CourseDetail
