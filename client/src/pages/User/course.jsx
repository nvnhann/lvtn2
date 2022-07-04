import React, { useEffect, useState } from 'react'
import {IoMdFolderOpen} from 'react-icons/io'
import {Link} from 'react-router-dom';
import * as $http from '../../utils/httpProvider';
import * as CONFIG from '../../config/configUrl';

function Course() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const res = await $http.getData(CONFIG.API_BASE_URL+'/course');
      setData(res.data);
      console.log(res.data)
    })()
  },[]);
  console.log(data)
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      {data?.map((e) => (
        e.users?.map((e1,idx) => (
          <div key={idx} className="relative w-[260px] bg-white rounded-md shadow-md">
          <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
            <div className="">
              <p className="text-[20px]">{e?.ten_khoa_hoc}</p>
              <p className="mt-6 text-[14px]">{e1.ho_ten}</p>
              <div className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full">
                {e1.avatar?.path_name && <img className=' w-[75px] h-[75px] rounded-full' src={CONFIG.API_BASE_URL+'/avatar/'+e1.avatar?.path_name} />}
                {!e1.avatar?.path_name && <img className=' w-[75px] h-[75px] rounded-full' src='/avatar.png' />}
              </div>
            </div>
          </div>
          <Link to={"/app/course/detail/id="+e.id+"&gv="+e1.id}>
            <div className="h-[150px]">
              <IoMdFolderOpen size={25} className="absolute bottom-2 right-2 cursor-pointer" />
            </div>
          </Link>
        </div>
        ))
      ))}
    </div>
  )
}

export default Course
