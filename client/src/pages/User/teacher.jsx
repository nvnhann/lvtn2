import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {Link} from 'react-router-dom';
import * as $http from '../../utils/httpProvider';
import * as CONFIG from '../../config/configUrl';


function Teacher() {
  const [data, setData] = useState([]);
  const [idBomon, setIdBomon] = useState(1);
  const [gv, setGv] = useState([]);

  useEffect(() => {
    (async () => {
        const res = await $http.getData(CONFIG.API_BASE_URL + '/bomon');
        setData(res.data);

    })() },[]);

  useEffect(() => {
    (async () => {
      const res = await $http.getData(CONFIG.API_BASE_URL + '/bomon/'+idBomon);
      setGv(res.data)
    })()
      
  },[idBomon])
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {data?.map((e, idx) => (
          <button  key={idx} onClick={(()=> setIdBomon(e.id))} className="p-4 text-center  text-white font-medium rounded-md bg-[#1E8FCF] focus:bg-orange-500 cursor-pointer">
          {e.name}
        </button>
        ))}
       
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {gv?.users?.map((e,idx) => (
          <Link key={idx}to="/app/teacher/teacher_profile">
          <div className="p-4 text-center font-medium bg-white rounded-md cursor-pointer">
            <p>{e.ho_ten}</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default Teacher;
