import React from 'react'
import {FiDownload, FiPrinter} from 'react-icons/fi'
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi'

function DocumentDetail() {
  return (
    <div>
      <div className="flex justify-between items-center gap-5 w-[65%]">
        <button className="px-8 py-2 font-bold text-white bg-[#F38E46] rounded-md">Mở</button>

        <div className="flex items-center gap-2 cursor-pointer">
          <FiDownload className="cursor-pointer" size={25} />
          <p>Tải về</p>
        </div>

        <FiPrinter className="cursor-pointer" size={25} />
        <div className="flex items-center gap-5">
          <BiLeftArrow className="cursor-pointer" size={25} />
          <p>2/10</p>
          <BiRightArrow className="cursor-pointer" size={25} />
        </div>
      </div>
      <div className="mt-5 w-[65%] h-[100vh] bg-slate-400"></div>
    </div>
  )
}

export default DocumentDetail
