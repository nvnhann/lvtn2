import React from 'react'
import {Link} from 'react-router-dom'

function Teacher() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        <button className="p-4 text-center  text-white font-medium rounded-md bg-[#1E8FCF] focus:bg-orange-500 cursor-pointer">
          Công nghệ thông tin
        </button>
        <button className="p-4 text-center  text-white font-medium rounded-md bg-[#1E8FCF] focus:bg-orange-500 cursor-pointer">
          Công nghệ thông tin
        </button>
        <button className="p-4 text-center  text-white font-medium rounded-md bg-[#1E8FCF] focus:bg-orange-500 cursor-pointer">
          Công nghệ thông tin
        </button>
        <button className="p-4 text-center  text-white font-medium rounded-md bg-[#1E8FCF] focus:bg-orange-500 cursor-pointer">
          Công nghệ thông tin
        </button>
        <button className="p-4 text-center  text-white font-medium rounded-md bg-[#1E8FCF] focus:bg-orange-500 cursor-pointer">
          Công nghệ thông tin
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <Link to="/app/teacher/teacher_profile">
          <div className="p-4 text-center font-medium bg-white rounded-md cursor-pointer">
            <p>TS. Phạm Thế Phi</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Teacher
