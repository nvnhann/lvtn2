import React from 'react'
import {IoMdFolderOpen} from 'react-icons/io'
import {Link} from 'react-router-dom'

function Course() {
  return (
    <div>
      <div className="relative w-[260px] bg-white rounded-md shadow-md">
        <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
          <div className="">
            <p className="text-[20px]">CT428-Lập trình web</p>
            <p className="mt-6 text-[14px]">Nguyễn Minh Trung</p>
            <div className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full"></div>
          </div>
        </div>
        <Link to="/user/course/detail=jkasndjj">
          <div className="h-[150px]">
            <IoMdFolderOpen size={25} className="absolute bottom-2 right-2 cursor-pointer" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Course
