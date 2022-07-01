import React from 'react'
import {Link} from 'react-router-dom'

function CourseDetailList() {
  return (
    <div>
      <div className="flex justify-center align-middle mx-auto py-4 w-[80%] bg-[#2554A6] rounded-md">
        <p className="text-white text-[30px]">CT113-POLICE</p>
      </div>
      <div className="mx-auto w-[80%]">
        <p className="mt-4 mb-2 text-[18px] font-bold">Các file ôn tập cuối kỳ</p>
        <div className="grid grid-cols-2 gap-5">
          <Link to="/user/course/detail=id1/subject=id2">
            <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
              <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
              <div>
                <p>Chương 1</p>
                <p>Giải thuật cây quyết định</p>
                <p>PDF</p>
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-4 mb-2 text-[18px] font-bold">Chương 1</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
            <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
            <div>
              <p>Chương 1</p>
              <p>Giải thuật cây quyết định</p>
              <p>PDF</p>
            </div>
          </div>
        </div>

        <p className="mt-4 mb-2 text-[18px] font-bold">Chương 2</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
            <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
            <div>
              <p>Chương 2</p>
              <p>Giải thuật cây quyết định</p>
              <p>PDF</p>
            </div>
          </div>
          <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
            <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
            <div>
              <p>Chương 2</p>
              <p>Giải thuật cây quyết định</p>
              <p>PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailList
