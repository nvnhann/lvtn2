import React from 'react'
import {MdDelete} from 'react-icons/md'
import {Link} from 'react-router-dom'

const arr_1 = [
  {
    id: 1,
    tenbaibao: 'Xây dựng website Bán đồ hàng',
    tengv: 'Nguyễn Trần Thị Ngọc Lê',
  },
  {
    id: 2,
    tenbaibao: 'Xây dựng website Bán đồ hàng',
    tengv: 'Nguyễn Trần Thị Ngọc Lê',
  },
  {
    id: 3,
    tenbaibao: 'Xây dựng website Bán đồ hàng',
    tengv: 'Nguyễn Trần Thị Ngọc Lê',
  },
  {
    id: 4,
    tenbaibao: 'Xây dựng website Bán đồ hàng',
    tengv: 'Nguyễn Trần Thị Ngọc Lê',
  },
  {
    id: 5,
    tenbaibao: 'Xây dựng website Bán đồ hàng',
    tengv: 'Nguyễn Trần Thị Ngọc Lê',
  },
]

function Document() {
  return (
    <div>
      <div className="mb-4 text-white font-bold">
        <Link to="/user/document/save">
          <button className="px-6 py-2 bg-[#F38E46] rounded-md">Đã lưu</button>
        </Link>
        <Link to="/app/document/upload">
          <button className="ml-4 px-6 py-2 bg-[#F38E46] rounded-md">Tải lên</button>
        </Link>
      </div>
      <div className="w-full  grid grid-cols-4 gap-2">
        {arr_1?.map((item, idx) => (
          <Link key={idx} to="/user/document/detail">
            <div className="bg-white p-3 rounded-md">
              <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
              <p>
                <strong>{item.tenbaibao}</strong>
              </p>
              <span>
                tạo bởi <strong>{item.tengv}</strong>
              </span>
              <p>
                <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">
                  Máy học
                </span>
                <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">
                  ML
                </span>
              </p>

              <MdDelete size={30} color="#757575" className="ml-auto mr-0 cursor-pointer" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Document
